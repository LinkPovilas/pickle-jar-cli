import { exec } from 'node:child_process';

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
async function runScenarios(shard, cucumberArguments) {
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
    const testScript = `npx cucumber-js ${scenarioPathsToRun.join(' ')} ${cucumberOptions.join(' ')}`;

    exec(testScript, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return;
        }
        console.info(stdout);
        console.error(stderr);
    });
}

export { runScenarios };
