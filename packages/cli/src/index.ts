#!/usr/bin/env node
import { Options, process as mardoxProcess } from '@mardox/core';
import { program } from 'commander';
import { allParams, CliParam } from './cli-params';

allParams.forEach((param: CliParam) =>
    program.option(`-${param.short}, --${param.long}`, param.description)
);

program.parse(process.argv);

const options = allParams.reduce(
    (accumulator: Options, param: CliParam) =>
        Object.assign(accumulator, param.mapping(program)),
    {} as Options
);

if (!program.file)
    throw Error('No input File provided. Use --file to provide a file');

mardoxProcess(options);
