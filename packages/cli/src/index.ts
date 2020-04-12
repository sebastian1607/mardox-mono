#!/usr/bin/env node
import { convert, Options } from '@mardox/core';
import { program } from 'commander';

program
    .option('--file <inputFile>', 'File to convert')
    .option('--out <outputFile>', 'Output file')
    .parse(process.argv);

if (!program.file) throw Error("No input File provided. Use --file to provide a file")

const options: Options = {
    inputFile: program.inputFile,
}
if (program.out === true) {
    options.outputFile = program.out
}
convert(options);




