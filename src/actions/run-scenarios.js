import { spawn } from 'node:child_process';

import { getScenarioPaths } from '../utils/gherkin.js';
import {
    calculateShardRange,
    getScenarioPathsByShardRange,
    processShardInput,
} from '../utils/shard.js';

/**
 * Runs scenarios based on the provided shard and arguments.
 *
 * @param {string} shard - The shard input for running scenarios.
 * @param {Array<string>} cucumberArguments - Additional arguments for running scenarios.
 * @return {Promise<void>} Promise that resolves after running the scenarios.
 */
function runScenarios(shard, cucumberArguments) {
    const [shardIndex, shardTotal] = processShardInput(shard);
    const scenarioPaths = getScenarioPaths();
    const shardRange = calculateShardRange(
        shardIndex,
        shardTotal,
        scenarioPaths.length
    );
    const scenarioPathsToRun = getScenarioPathsByShardRange(
        scenarioPaths,
        shardRange
    );

    console.info(`Running ${scenarioPathsToRun.length} scenarios...`);
    const cucumberOptions = cucumberArguments.slice(2);
    const testScript = 'npx';
    const arguments_ = [
        'cucumber-js',
        ...scenarioPathsToRun,
        ...cucumberOptions,
    ];

    const childProcess = spawn(testScript, arguments_);

    childProcess.stdout.on('data', (data) => {
        console.info(data.toString());
    });

    childProcess.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    childProcess.on('error', (error) => {
        console.error('Error during execution:', error);
    });

    childProcess.on('close', (code) => {
        if (code !== 0) {
            console.error('Process exited with code:', code);
        }
    });
}

export { runScenarios };
