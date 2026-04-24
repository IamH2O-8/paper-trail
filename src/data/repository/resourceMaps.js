const resourceTableMap = {
  projects: "projects",
  trips: "trips",
  productions: "productions",
  expenses: "expenses",
  people: "people",
  reminders: "reminders",
  documents: "documents",
  captures: "captures",
  ideas: "ideas",
  knowledge: "knowledge",
  invoices: "invoices",
  payments: "payments"
};

const resourceIdPrefixMap = {
  projects: "project",
  trips: "trip",
  productions: "production",
  expenses: "expense",
  people: "person",
  reminders: "reminder",
  documents: "document",
  captures: "capture",
  ideas: "idea",
  knowledge: "knowledge",
  invoices: "invoice",
  payments: "payment"
};

module.exports = {
  resourceIdPrefixMap,
  resourceTableMap
};
