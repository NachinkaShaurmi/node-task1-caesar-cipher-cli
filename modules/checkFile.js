const { access } = require('fs/promises');
const fs = require('fs');

async function checkFilePath(path, mode) {
  path = path.split('\\').join('/');
  try {
    await access(path, mode === "read" ? fs.constants.R_OK : fs.constants.W_OK);
  } catch {
    process.stderr.write(`\nFile path ${path} not valid. \nFile is missing (or cannot be accessed)\n`);
    process.exit(1);
  }
}

module.exports = checkFilePath;