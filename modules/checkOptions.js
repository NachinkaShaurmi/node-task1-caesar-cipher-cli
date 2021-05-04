function checkOptions(options) {
  if (!options.hasOwnProperty('action')) {
    process.stderr.write('\nRequired parameter "--action (-a)" not found\n');
    process.exit(1);
  }

  if (!options.hasOwnProperty('shift')) {
    process.stderr.write('\nRequired parameter "--shift (-s)" not found\n');
    process.exit(1);
  } 
  
  const action =  options.action.toLowerCase();
  const shift =  Number.parseInt(options.shift);

  if (!(action === 'encode' || action === 'decode')) {
    process.stderr.write(`\nParameter "--action (-a)" not valid. \nValid values: encode/decode. \nYour value: ${action} \n`);
    process.exit(1);
  }

  if (Number.isNaN(shift)) {
    process.stderr.write(`\nParameter "--shift (-s)" not valid. \nValid type value: number.\n`);
    process.exit(1);
  }

}

module.exports = checkOptions;
