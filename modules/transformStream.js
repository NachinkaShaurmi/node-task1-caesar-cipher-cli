const { Transform } = require("stream");
const encryption = require("./encryption");

function transformStream(shift, mode) {
  const myTransform = new Transform({
    transform(chunk, encoding, callback) {
      this.push(encryption(chunk.toString(), shift, mode));
      callback();
    },
  });
  return myTransform;
}

module.exports = transformStream;
