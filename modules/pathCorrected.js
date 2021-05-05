function pathCorrected(path) {
  const arr = path.split('/');
  if (arr[0] === '.') arr.splice(0, 1);
  return arr.join('');
}

module.exports = pathCorrected;