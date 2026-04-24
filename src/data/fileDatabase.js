const fs = require("fs/promises");
const path = require("path");
const { dataFile } = require("../config");
const { seedState } = require("./seedState");

let writeLock = Promise.resolve();

async function ensureDatabaseFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(seedState, null, 2));
  }
}

async function readState() {
  await ensureDatabaseFile();
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw);
}

async function writeState(nextState) {
  writeLock = writeLock.then(async () => {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(nextState, null, 2));
  });

  await writeLock;
}

module.exports = {
  readState,
  writeState
};
