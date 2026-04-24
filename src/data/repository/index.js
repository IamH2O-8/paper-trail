const { repositoryMode } = require("../../config");
const { createFileRepository } = require("./createFileRepository");
const { createSupabaseRepository } = require("./createSupabaseRepository");

let repository;

function getRepository() {
  if (!repository) {
    repository = repositoryMode === "supabase" ? createSupabaseRepository() : createFileRepository();
  }

  return repository;
}

module.exports = { getRepository };
