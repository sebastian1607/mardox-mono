#!/usr/bin/env node
import { Options, process as mardoxProcess } from '@mardox/core';
import { program } from 'commander';
import { allParams, CliParam } from './cli-params';

allParams.forEach((param: CliParam) =>
    program.option(
        `-${param.key.short}, --${param.key.parserInput}`,
        param.description
    )
);

program.parse(process.argv);

const options = allParams
    .filter((param) => {
        return (
            program[param.short] || program[param.long] || param.deriveIfMissing
        );
    })
    .reduce(
        (accumulator: Options, param: CliParam) =>
            param.mapping(program, accumulator),
        {} as Options
    );

if (options.verbose) {
    console.log(JSON.stringify(options, null, 2));
}

if (!program.file)
    throw Error('No input File provided. Use --file to provide a file');

mardoxProcess(options);
