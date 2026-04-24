const { getRepository } = require("../data/repository");
const { getQuestionnaireTemplate } = require("../domain/questionnaireTemplates");
const { buildComplianceSummary, decorateRecord } = require("./complianceService");
const { requireRequestAuth } = require("./requestAuth");
const { toVisibleState } = require("./workspaceState");

async function listEntityQuestionnaires(resourceName, entityId) {
  const auth = requireRequestAuth();
  const repository = getRepository();
  const state = toVisibleState(await repository.getState(), auth.workspaceId);
  const entity = (state[resourceName] || []).find((item) => item.id === entityId);
  if (!entity) {
    return {
      resourceName,
      entityId,
      questionnaires: []
    };
  }

  const questionnaires = (await repository.listQuestionnairesForEntity(resourceName, entityId)).filter(
    (item) => item.workspaceId === auth.workspaceId
  );

  return {
    resourceName,
    entityId,
    questionnaires: questionnaires.map(toQuestionnaireResponse)
  };
}

async function getEntityQuestionnaire(resourceName, entityId, stage) {
  const auth = requireRequestAuth();
  const repository = getRepository();
  const state = toVisibleState(await repository.getState(), auth.workspaceId);
  const entity = (state[resourceName] || []).find((item) => item.id === entityId);
  if (!entity) {
    return null;
  }

  const template = getQuestionnaireTemplate(resourceName, stage);
  if (!template) {
    throw new Error("Questionnaire template not found");
  }

  const questionnaire = await repository.getQuestionnaire(resourceName, entityId, stage);

  return {
    resourceName,
    entityId,
    stage,
    title: template.title,
    description: template.description,
    entityLabel: entity.title || entity.fullName,
    questions: template.questions,
    questionnaire: questionnaire ? toQuestionnaireResponse(questionnaire) : null
  };
}

async function submitEntityQuestionnaire(resourceName, entityId, stage, answers) {
  const auth = requireRequestAuth();
  const repository = getRepository();
  const state = toVisibleState(await repository.getState(), auth.workspaceId);
  const collection = state[resourceName] || [];
  const entity = collection.find((item) => item.id === entityId);
  if (!entity) {
    return null;
  }

  const template = getQuestionnaireTemplate(resourceName, stage);
  if (!template) {
    throw new Error("Questionnaire template not found");
  }

  validateAnswers(template, answers);

  const now = new Date().toISOString();
  const questionnaire = await repository.saveQuestionnaire({
    workspaceId: auth.workspaceId,
    linkedType: resourceName,
    linkedId: entityId,
    stage,
    title: template.title,
    description: template.description,
    answers,
    status: "completed",
    answeredAt: now
  });

  const patchedEntity = applyQuestionnaireEffects(resourceName, stage, entity, answers);
  const finalEntity = {
    ...patchedEntity,
    updatedAt: now
  };

  await repository.update(resourceName, entityId, finalEntity);
  const nextState = toVisibleState(await repository.getState(), auth.workspaceId);
  const persistedEntity = (nextState[resourceName] || []).find((item) => item.id === entityId);
  const compliance = buildComplianceSummary(nextState, resourceName, persistedEntity);

  return {
    questionnaire: toQuestionnaireResponse(questionnaire),
    entity: decorateRecord(nextState, resourceName, persistedEntity),
    compliance
  };
}

function validateAnswers(template, answers) {
  for (const question of template.questions) {
    if (!question.required) {
      continue;
    }

    const value = answers[question.key];
    if (value === undefined || value === null || String(value).trim() === "") {
      throw new Error(`Question '${question.label}' is required`);
    }
  }
}

function applyQuestionnaireEffects(resourceName, stage, entity, answers) {
  if (resourceName === "projects" && stage === "opening") {
    return {
      ...entity,
      commercialObjective: answers.commercialObjective || entity.commercialObjective,
      revenueOutcome: answers.revenueGoal || entity.revenueOutcome,
      timeline: answers.timelineNote || entity.timeline
    };
  }

  if (resourceName === "projects" && stage === "closure") {
    const allReviewed = answers.allLinkedRecordsReviewed === "Yes";
    const hasRemainingGaps = normalizeFreeText(answers.remainingGaps) !== "none";

    return {
      ...entity,
      narrative: answers.narrativeSummary || entity.narrative,
      closureStatus: allReviewed && !hasRemainingGaps ? "Final Close" : "Soft Close"
    };
  }

  if (resourceName === "trips" && stage === "opening") {
    return {
      ...entity,
      purpose: answers.primaryBusinessPurpose || entity.purpose,
      briefSaved: answers.briefSaved === "Yes",
      spouseOrContractor: answers.contractorInvolved === "Yes",
      estimatedBudget: toNumberOrFallback(answers.estimatedBudget, entity.estimatedBudget),
      outcomeNotes: entity.outcomeNotes || answers.plannedContent || ""
    };
  }

  if (resourceName === "trips" && stage === "closure") {
    return {
      ...entity,
      postTripComplete: true,
      actualSpend: toNumberOrFallback(answers.actualSpend, entity.actualSpend),
      outcomeNotes: answers.businessActivitySummary || entity.outcomeNotes,
      closureStatus: answers.readyForCpaReview === "Yes" && answers.allExpensesLogged === "Yes" ? "Final Close" : "Soft Close"
    };
  }

  if (resourceName === "productions" && stage === "opening") {
    return {
      ...entity,
      businessPurpose: answers.businessPurpose || entity.businessPurpose,
      roleDocumentationComplete: answers.participantsDocumented === "Yes"
    };
  }

  if (resourceName === "productions" && stage === "closure") {
    return {
      ...entity,
      contentType: answers.producedFormat || entity.contentType,
      roleDocumentationComplete: answers.roleDocumentationComplete === "Yes",
      publishedUrl: answers.published === "Yes" ? answers.publishedUrl || entity.publishedUrl : "",
      outcomeNotes: answers.nextStep || entity.outcomeNotes,
      closureStatus: answers.roleDocumentationComplete === "Yes" && answers.published === "Yes" ? "Final Close" : "Soft Close"
    };
  }

  return entity;
}

function normalizeFreeText(value) {
  return String(value || "").trim().toLowerCase();
}

function toNumberOrFallback(value, fallback) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function toQuestionnaireResponse(questionnaire) {
  return {
    id: questionnaire.id,
    linkedType: questionnaire.linkedType,
    linkedId: questionnaire.linkedId,
    stage: questionnaire.stage,
    title: questionnaire.title,
    description: questionnaire.description,
    status: questionnaire.status,
    answers: questionnaire.answers || {},
    answeredAt: questionnaire.answeredAt || questionnaire.updatedAt || questionnaire.createdAt,
    createdAt: questionnaire.createdAt,
    updatedAt: questionnaire.updatedAt
  };
}

module.exports = {
  getEntityQuestionnaire,
  listEntityQuestionnaires,
  submitEntityQuestionnaire
};
