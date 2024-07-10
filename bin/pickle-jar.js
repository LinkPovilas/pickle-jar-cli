#!/usr/bin/env node
"use strict";

const { setupCli, executeTestScript } = require("../src/program.js");
const { getScenarioPaths } = require("../src/gherkin-parser.js");
const {
  processShardInput,
  calculateShardRange,
  getScenarioPathsByShardRange,
} = require("../src/shard-parser.js");

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
