import { setupCli, executeTestScript } from '../src/program.js';
import { getScenarioPaths } from '../src/gherkin-parser.js';
import {
    processShardInput,
    calculateShardRange,
    getScenarioPathsByShardRange,
} from '../src/shard-parser.js';

const bootstrap = () => {
    const { testScript, options } = setupCli();
    const [shardIndex, shardTotal] = processShardInput(options);
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

    executeTestScript(testScript, scenarioPathsToRun);
};

bootstrap();
