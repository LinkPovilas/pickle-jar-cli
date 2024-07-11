#!/usr/bin/env node
import figlet from 'figlet';
import { Command } from 'commander';

import { runScenarios } from '../src/actions/run-scenarios.js';
import { getPackageVersion } from '../src/utils/package.js';

const bootstrap = () => {
    console.info(figlet.textSync('Pickle Jar'));
    const program = new Command();

    program
        .name('pickle-jar')
        .version(
            getPackageVersion(),
            '-v, --version',
            'Output the current version.'
        )
        .usage('<command> [options]')
        .helpOption('-h, --help', 'Output usage information.');

    program
        .command('test')
        .description('Run cucumber scenarios')
        .argument('<shardIndex/shardTotal>', 'Run a subset of scenarios')
        .allowUnknownOption()
        .action((shard) => runScenarios(shard, program.args));

    program.parseAsync(process.argv);
};

bootstrap();
