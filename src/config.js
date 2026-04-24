const path = require("path");

const rootDir = path.resolve(__dirname, "..");

module.exports = {
  rootDir,
  webRoot: path.join(rootDir, "web"),
  dataFile: process.env.APP_DATA_FILE || path.join(rootDir, "data", "dev-database.json"),
  uploadsRoot: process.env.APP_UPLOADS_DIR || path.join(rootDir, "data", "uploads"),
  repositoryMode: process.env.APP_REPOSITORY || "file",
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  supabaseStorageBucket: process.env.SUPABASE_STORAGE_BUCKET || "content-documents",
  appBaseUrl: process.env.APP_BASE_URL || "",
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  openaiBaseUrl: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  openaiVisionModel: process.env.OPENAI_VISION_MODEL || "gpt-4o-mini",
  openaiClassificationModel: process.env.OPENAI_CLASSIFICATION_MODEL || "gpt-4o-mini",
  openaiTranscriptionModel: process.env.OPENAI_TRANSCRIPTION_MODEL || "gpt-4o-mini-transcribe",
  sessionCookieName: process.env.APP_SESSION_COOKIE || "paper_trail_session",
  sessionSecret: process.env.APP_SESSION_SECRET || "local-dev-session-secret-change-me",
  secureCookies: /^https:/i.test(process.env.APP_BASE_URL || "")
};
