const path = require("path");

function pathTransform(myPath, dirPath) {
  if (path.isAbsolute(myPath)) return myPath;
  return path.join(dirPath, myPath);
}

module.exports = pathTransform;
