#!/usr/bin/env node
import { Options, process as mardoxProcess } from '@mardox/core';
import { program } from 'commander';
import { allParams, CliParam, valuePlaceHolder } from './cli-params';

const isParamPresent = (param: CliParam) => {
    const longParamWithoutValue = param.long
        .replace(valuePlaceHolder, '')
        .trim();
    return Object.keys(program).some(
        (value) => value === longParamWithoutValue || value === program.short
    );
};

allParams.forEach((param: CliParam) =>
    program.option(`-${param.short}, --${param.long}`, param.description)
);

program.parse(process.argv);

const options = allParams
    .filter((param: CliParam) => isParamPresent(param))
    .reduce(
        (accumulator: Options, param: CliParam) =>
            param.mapping(program, accumulator),
        {} as Options
    );

mardoxProcess(options);
