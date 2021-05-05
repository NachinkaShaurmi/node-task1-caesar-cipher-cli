const { program } = require("commander");
const fs = require("fs");
const checkOptions = require("./modules/checkOptions");
const checkFilePath = require("./modules/checkFile");
const transformStream = require("./modules/transformStream");
const { pipeline } = require("stream");

program
  .option("-s, --shift <number>", "a shift")
  .option("-i, --input <file>", "an input file")
  .option("-o, --output <file>", "an output file")
  .option("-a, --action <encode or decode>", "an action encode/decode");

program.parse(process.argv);

const options = program.opts();
checkOptions(options);

const { shift, action, input, output } = options;

if (input) checkFilePath(__dirname + "/" + input, "read");
if (output) checkFilePath(__dirname + "/" + output, "write");

let transformableStream = transformStream(Number.parseInt(shift), action);
let readableStream = input
  ? fs.createReadStream(__dirname + "/" + input, { 'encoding': "utf-8" })
  : process.stdin;
let writableStream = output
  ? fs.createWriteStream(__dirname + "/" + output, {
      'encoding': "utf-8",
      'flags': "a",
    })
  : process.stdout;

pipeline(readableStream, transformableStream, writableStream, (err) => {
  if (err) {
    process.stderr.write("Pipeline failed.", err);
    process.exit(1);
  }
});
