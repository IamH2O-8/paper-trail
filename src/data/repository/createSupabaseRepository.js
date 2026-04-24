const { supabaseServiceRoleKey, supabaseUrl } = require("../../config");
const { resourceTableMap } = require("./resourceMaps");
const { fromQuestionnaireRow, fromRow, fromWorkspaceRow, toRow } = require("./rowMappers");

function createSupabaseRepository() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase repository mode requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  }

  const headers = {
    apikey: supabaseServiceRoleKey,
    Authorization: `Bearer ${supabaseServiceRoleKey}`,
    "Content-Type": "application/json",
    Prefer: "return=representation"
  };

  async function request(path, options = {}) {
    const response = await fetch(`${supabaseUrl}/rest/v1${path}`, {
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {})
      }
    });

    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json") ? await response.json() : await response.text();

    if (!response.ok) {
      throw new Error(typeof payload === "string" ? payload : payload.message || payload.hint || "Supabase request failed");
    }

    return payload;
  }

  async function getWorkspace(workspaceId = "") {
    const rows = await request(
      workspaceId
        ? `/workspaces?select=*&id=eq.${encodeURIComponent(workspaceId)}&limit=1`
        : "/workspaces?select=*&order=created_at.asc&limit=1"
    );
    return rows[0] ? fromWorkspaceRow(rows[0]) : null;
  }

  async function getWorkspaceById(workspaceId) {
    return getWorkspace(workspaceId);
  }

  async function createWorkspace(workspace) {
    const rows = await request("/workspaces", {
      method: "POST",
      body: JSON.stringify({
        id: workspace.id,
        name: workspace.name,
        slug: workspace.slug || null,
        focus: workspace.focus || "",
        default_currency: workspace.defaultCurrency || "CAD",
        created_at: workspace.createdAt,
        updated_at: workspace.updatedAt
      })
    });

    return rows[0] ? fromWorkspaceRow(rows[0]) : workspace;
  }

  async function getUserByEmail(email) {
    const rows = await request(`/users?select=*&email=eq.${encodeURIComponent(email)}&limit=1`);
    return rows[0] ? fromUserRow(rows[0]) : null;
  }

  async function getUserById(id) {
    const rows = await request(`/users?select=*&id=eq.${encodeURIComponent(id)}&limit=1`);
    return rows[0] ? fromUserRow(rows[0]) : null;
  }

  async function createUser(user) {
    const rows = await request("/users", {
      method: "POST",
      body: JSON.stringify(toUserRow(user))
    });
    return rows[0] ? fromUserRow(rows[0]) : user;
  }

  async function fetchQuestionnaireAnswers(questionnaireIds) {
    if (!questionnaireIds.length) {
      return [];
    }

    const joined = questionnaireIds.map((id) => `"${id}"`).join(",");
    return request(`/compliance_questionnaire_answers?select=*&questionnaire_id=in.(${joined})&order=answered_at.asc`);
  }

  async function listQuestionnairesForEntity(linkedType, linkedId) {
    const rows = await request(
      `/compliance_questionnaires?select=*&linked_type=eq.${encodeURIComponent(linkedType)}&linked_id=eq.${encodeURIComponent(linkedId)}&order=updated_at.desc`
    );
    const answers = await fetchQuestionnaireAnswers(rows.map((row) => row.id));

    return rows.map((row) =>
      fromQuestionnaireRow(
        row,
        answers.filter((answer) => answer.questionnaire_id === row.id)
      )
    );
  }

  async function getQuestionnaire(linkedType, linkedId, stage) {
    const rows = await request(
      `/compliance_questionnaires?select=*&linked_type=eq.${encodeURIComponent(linkedType)}&linked_id=eq.${encodeURIComponent(linkedId)}&questionnaire_type=eq.${encodeURIComponent(stage)}&limit=1`
    );
    if (!rows[0]) {
      return null;
    }

    const answers = await fetchQuestionnaireAnswers([rows[0].id]);
    return fromQuestionnaireRow(rows[0], answers);
  }

  async function saveQuestionnaire(questionnaire) {
    const existing = await getQuestionnaire(questionnaire.linkedType, questionnaire.linkedId, questionnaire.stage);
    const now = questionnaire.answeredAt || new Date().toISOString();

    const questionnaireRow = {
      id: existing?.id || `q-${questionnaire.linkedType}-${questionnaire.stage}-${Math.random().toString(36).slice(2, 8)}`,
      workspace_id: questionnaire.workspaceId,
      linked_type: questionnaire.linkedType,
      linked_id: questionnaire.linkedId,
      questionnaire_type: questionnaire.stage,
      title: questionnaire.title || "",
      description: questionnaire.description || "",
      status: questionnaire.status || "completed",
      created_at: existing?.createdAt || now,
      updated_at: now
    };

    const rows = await request(`/compliance_questionnaires${existing ? `?id=eq.${encodeURIComponent(existing.id)}` : ""}`, {
      method: existing ? "PATCH" : "POST",
      body: JSON.stringify(questionnaireRow)
    });

    const persistedRow = Array.isArray(rows) ? rows[0] : questionnaireRow;

    if (existing) {
      await request(`/compliance_questionnaire_answers?questionnaire_id=eq.${encodeURIComponent(existing.id)}`, {
        method: "DELETE",
        headers: {
          Prefer: "return=minimal"
        }
      });
    }

    const answerRows = Object.entries(questionnaire.answers || {}).map(([questionKey, answerValue]) => ({
      id: `qa-${Math.random().toString(36).slice(2, 8)}`,
      questionnaire_id: persistedRow.id,
      question_key: questionKey,
      answer_text: String(answerValue ?? ""),
      answered_at: now
    }));

    if (answerRows.length) {
      await request("/compliance_questionnaire_answers", {
        method: "POST",
        body: JSON.stringify(answerRows)
      });
    }

    return {
      id: persistedRow.id,
      workspaceId: questionnaire.workspaceId,
      linkedType: questionnaire.linkedType,
      linkedId: questionnaire.linkedId,
      stage: questionnaire.stage,
      title: questionnaire.title || "",
      description: questionnaire.description || "",
      status: questionnaire.status || "completed",
      answers: questionnaire.answers || {},
      answeredAt: now,
      createdAt: existing?.createdAt || now,
      updatedAt: now
    };
  }

  async function list(resourceName) {
    const table = resourceTableMap[resourceName];
    const rows = await request(`/${table}?select=*&order=created_at.desc`);
    return rows.map((row) => fromRow(resourceName, row));
  }

  async function getById(resourceName, id) {
    const table = resourceTableMap[resourceName];
    const rows = await request(`/${table}?select=*&id=eq.${encodeURIComponent(id)}&limit=1`);
    return rows[0] ? fromRow(resourceName, rows[0]) : null;
  }

  async function create(resourceName, record) {
    const table = resourceTableMap[resourceName];
    const rows = await request(`/${table}`, {
      method: "POST",
      body: JSON.stringify(toRow(resourceName, record))
    });
    return fromRow(resourceName, rows[0]);
  }

  async function update(resourceName, id, record) {
    const table = resourceTableMap[resourceName];
    const rows = await request(`/${table}?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(toRow(resourceName, record))
    });

    return rows[0] ? fromRow(resourceName, rows[0]) : null;
  }

  async function remove(resourceName, id) {
    const table = resourceTableMap[resourceName];
    await request(`/${table}?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        Prefer: "return=minimal"
      }
    });

    return true;
  }

  async function getState() {
    const workspace = await getWorkspace();
    const projects = await list("projects");
    const trips = await list("trips");
    const productions = await list("productions");
    const expenses = await list("expenses");
    const people = await list("people");
    const reminders = await list("reminders");
    const documents = await list("documents");
    const captures = await list("captures");
    const ideas = await list("ideas");
    const knowledge = await list("knowledge");
    const invoices = await list("invoices");
    const payments = await list("payments");
    const questionnaires = await request("/compliance_questionnaires?select=*&order=updated_at.desc");
    const questionnaireAnswers = await fetchQuestionnaireAnswers(questionnaires.map((row) => row.id));

    return {
      workspace,
      projects,
      trips,
      productions,
      expenses,
      people,
      reminders,
      documents,
      captures,
      ideas,
      knowledge,
      invoices,
      payments,
      questionnaires: questionnaires.map((row) =>
        fromQuestionnaireRow(
          row,
          questionnaireAnswers.filter((answer) => answer.questionnaire_id === row.id)
        )
      )
    };
  }

  return {
    getWorkspace,
    getWorkspaceById,
    createWorkspace,
    getUserByEmail,
    getUserById,
    createUser,
    getState,
    list,
    getById,
    create,
    update,
    remove,
    listQuestionnairesForEntity,
    getQuestionnaire,
    saveQuestionnaire
  };
}

function fromUserRow(row) {
  return {
    id: row.id,
    workspaceId: row.workspace_id,
    email: row.email,
    fullName: row.full_name || "",
    role: row.role || "owner",
    passwordHash: row.password_hash || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function toUserRow(user) {
  return {
    id: user.id,
    workspace_id: user.workspaceId,
    email: user.email,
    full_name: user.fullName || "",
    role: user.role || "owner",
    password_hash: user.passwordHash || "",
    created_at: user.createdAt,
    updated_at: user.updatedAt
  };
}

module.exports = { createSupabaseRepository };
