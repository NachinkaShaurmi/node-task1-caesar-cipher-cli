const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const pathTransform = require("./modules/pathTransform")
const checkOptions = require("./modules/checkOptions");
const checkFilePath = require("./modules/checkFile");
const transformStream = require("./modules/transformStream");
const { pipeline } = require("stream");


// Parse options
program
.option("-s, --shift <number>", "a shift")
.option("-i, --input <file>", "an input file")
.option("-o, --output <file>", "an output file")
.option("-a, --action <encode or decode>", "an action encode/decode");

program.parse(process.argv);
const options = program.opts();

// Checking options for validity 
checkOptions(options);

const { shift, action, input, output } = options;

// Checking file location to exist
const dirPath = path.join(__dirname);
let inputPath;
let outputPath;

if (input) {
  inputPath = pathTransform(input, dirPath);
  checkFilePath(inputPath, "read");
}
if (output) {
  outputPath = pathTransform(output, dirPath);
  checkFilePath(outputPath, "write");
}

// Create streams
let transformableStream = transformStream(Number.parseInt(shift), action);
let readableStream = input
  ? fs.createReadStream(inputPath, { 'encoding': "utf-8" })
  : process.stdin;
let writableStream = output
  ? fs.createWriteStream(outputPath, {
      'encoding': "utf-8",
      'flags': "a",
    })
  : process.stdout;

// Combine streams in pipeline
pipeline(readableStream, transformableStream, writableStream, (err) => {
  if (err) {
    process.stderr.write("Pipeline failed.", err);
    process.exit(1);
  }
});
