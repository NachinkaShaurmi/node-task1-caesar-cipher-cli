const alphabet = require("./alphabet");
const {
  alphabetLowerCase,
  alphabetUpperCase,
  alphabetLowerCaseRev,
  alphabetUpperCaseRev,
} = alphabet;

function charEncrypt(char, shift, arr) {
  let resCharIndex = (arr.indexOf(char) + shift) % 26;
  if (resCharIndex < 0) resCharIndex += 26;
  return arr[resCharIndex];
}

function encryption(text, shift, mode) {
  const arr = text.split("");
  let res = "";

  if (mode === "encode") {
    arr.forEach((el) => {
      if (alphabetLowerCase.includes(el)) {
        res += charEncrypt(el, shift, alphabetLowerCase);
      } else if (alphabetUpperCase.includes(el)) {
        res += charEncrypt(el, shift, alphabetUpperCase);
      } else {
        res += el;
      }
    });
  }

  if (mode === "decode") {
    arr.forEach((el) => {
      if (alphabetLowerCaseRev.includes(el)) {
        res += charEncrypt(el, shift, alphabetLowerCaseRev);
      } else if (alphabetUpperCaseRev.includes(el)) {
        res += charEncrypt(el, shift, alphabetUpperCaseRev);
      } else {
        res += el;
      }
    });
  }
  console.log(res);
  return res;
}

module.exports = encryption;
