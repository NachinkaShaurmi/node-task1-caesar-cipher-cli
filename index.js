const { program } = require("commander");
const checkOptions = require("./modules/checkOptions");
const encryption = require("./modules/encryption");

program
  .option("-s, --shift <number>", "a shift")
  .option("-i, --input <file>", "an input file")
  .option("-o, --output <file>", "an output file")
  .option("-a, --action <encode or decode>", "an action encode/decode");

program.parse(process.argv);

const options = program.opts();
checkOptions(options);

// console.log(options);
