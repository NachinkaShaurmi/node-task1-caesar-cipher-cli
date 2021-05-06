const { access } = require("fs/promises");
const fs = require("fs");
const path = require("path")

async function checkFilePath(myPath, mode) {
  try {
    await access(myPath, mode === "read" ? fs.constants.R_OK : fs.constants.W_OK);
  } catch {
    process.stderr.write(
      `\nFile path ${myPath} not valid. \nFile is missing (or cannot be accessed)\n`
    );
    process.exit(1);
  }
  const { ext } = path.parse(myPath);
  if (ext === "") {
    process.stderr.write(
      `\nFile path ${myPath} not valid. \nFile extension missing\n`
    );
    process.exit(1);
  }
}

module.exports = checkFilePath;
