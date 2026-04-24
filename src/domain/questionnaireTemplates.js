const questionnaireTemplates = {
  projects: {
    opening: {
      title: "Project Opening Interview",
      description: "Capture the commercial reason for the project before work begins.",
      questions: [
        { key: "commercialObjective", label: "What is the main commercial objective?", type: "textarea", required: true, placeholder: "Describe the business goal of this project." },
        { key: "revenueGoal", label: "What revenue or business outcome does this support?", type: "textarea", required: true, placeholder: "Sponsorship, affiliate sales, client revenue, audience growth, etc." },
        { key: "timelineNote", label: "What is the planned timeline?", type: "text", required: true, placeholder: "For example: April to late May rollout" }
      ]
    },
    closure: {
      title: "Project Closure Questionnaire",
      description: "Summarize the project outcome and resolve missing documentation before close.",
      questions: [
        { key: "narrativeSummary", label: "Describe what the project produced and what business outcome it worked toward.", type: "textarea", required: true, placeholder: "Write a 2-3 sentence summary." },
        { key: "allLinkedRecordsReviewed", label: "Have all linked trips, productions, and expenses been reviewed?", type: "select", required: true, options: ["Yes", "No"] },
        { key: "remainingGaps", label: "What unresolved documentation gaps remain?", type: "textarea", required: true, placeholder: "If none, write 'None'." }
      ]
    }
  },
  trips: {
    opening: {
      title: "Trip Opening Interview",
      description: "Create the intent record before or immediately after the trip begins.",
      questions: [
        { key: "primaryBusinessPurpose", label: "What is the primary business purpose of this trip?", type: "textarea", required: true, placeholder: "Explain why this trip exists for the business." },
        { key: "plannedContent", label: "What content is planned?", type: "textarea", required: true, placeholder: "Series, platform, number of pieces, or planned deliverables." },
        { key: "estimatedBudget", label: "What is the estimated budget?", type: "number", required: true, placeholder: "0" },
        { key: "briefSaved", label: "Has a pre-trip content brief been saved?", type: "select", required: true, options: ["Yes", "No"] },
        { key: "contractorInvolved", label: "Is a contractor or spouse traveling in a documented business role?", type: "select", required: true, options: ["Yes", "No"] }
      ]
    },
    closure: {
      title: "Trip Closure Questionnaire",
      description: "Complete the delivery record for the trip and check if final close is possible.",
      questions: [
        { key: "allExpensesLogged", label: "Are all expenses for the trip logged with receipts where possible?", type: "select", required: true, options: ["Yes", "No"] },
        { key: "contentProduced", label: "What content was actually produced?", type: "textarea", required: true, placeholder: "List the content created or delivered." },
        { key: "businessActivitySummary", label: "Write a short business-purpose summary for a tax reviewer.", type: "textarea", required: true, placeholder: "Explain why this was primarily a business trip." },
        { key: "actualSpend", label: "What was the actual spend for the trip?", type: "number", required: true, placeholder: "0" },
        { key: "readyForCpaReview", label: "Is this trip ready for CPA review?", type: "select", required: true, options: ["Yes", "No"] }
      ]
    }
  },
  productions: {
    opening: {
      title: "Production Opening Interview",
      description: "Record the business purpose and operating plan before the shoot or production starts.",
      questions: [
        { key: "plannedOutput", label: "What content are you planning to produce?", type: "textarea", required: true, placeholder: "Describe the planned content." },
        { key: "businessPurpose", label: "What is the business purpose of this production?", type: "textarea", required: true, placeholder: "Audience, monetization path, or series objective." },
        { key: "participantsDocumented", label: "Are the key people and roles already documented?", type: "select", required: true, options: ["Yes", "No"] },
        { key: "estimatedCost", label: "What is the estimated cost?", type: "number", required: true, placeholder: "0" }
      ]
    },
    closure: {
      title: "Production Closure Questionnaire",
      description: "Confirm production details, role documentation, and publication state.",
      questions: [
        { key: "producedFormat", label: "What format was produced?", type: "text", required: true, placeholder: "Long-form video, reel, photo set, etc." },
        { key: "roleDocumentationComplete", label: "Are all people, roles, and deliverables documented?", type: "select", required: true, options: ["Yes", "No"] },
        { key: "published", label: "Has this content been published?", type: "select", required: true, options: ["Yes", "No"] },
        { key: "publishedUrl", label: "Published URL", type: "text", required: false, placeholder: "https://..." },
        { key: "nextStep", label: "If not published, what is the next step?", type: "textarea", required: true, placeholder: "Explain what happens next." }
      ]
    }
  }
};

function getQuestionnaireTemplate(resourceName, stage) {
  return questionnaireTemplates[resourceName]?.[stage] || null;
}

module.exports = {
  getQuestionnaireTemplate
};
