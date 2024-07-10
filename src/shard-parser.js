#!/usr/bin/env node

/**
 * Process the shard input options.
 *
 * @param {Object} options - The options object containing the shard input.
 * @return {Array} An array containing the shard index and total.
 */
const processShardInput = (options) => {
  const shard = options.shard;

  if (!shard) {
    throw new Error("Shard option is required");
  }

  if (!new RegExp(/^\d+\/\d+$/).test(shard)) {
    throw new Error("Invalid shard input");
  }

  const [shardIndex, shardTotal] = shard.split("/").map(Number);
  console.log(`Shard: ${shard}`);
  return [shardIndex, shardTotal];
};

/**
 * Calculates the range of tests for a specific shard based on the shard index, total number of shards, and total number of tests.
 *
 * @param {number} shardIndex - The index of the shard.
 * @param {number} shardTotal - The total number of shards.
 * @param {number} totalTests - The total number of tests.
 * @return {Array<number>} An array representing the range of tests for the specified shard.
 */
function calculateShardRange(shardIndex, shardTotal, totalTests) {
  if (shardIndex === 0 || shardTotal === 0 || totalTests === 0) {
    return;
  }

  if (shardIndex > totalTests) {
    return;
  }

  const testsPerShard = Math.max(Math.floor(totalTests / shardTotal), 1);
  const additionalScenario =
    shardIndex === shardTotal ? totalTests % shardTotal : 0;

  const startIndex = (shardIndex - 1) * testsPerShard;
  const endIndex = shardIndex * testsPerShard - 1 + additionalScenario;

  const shardRange =
    startIndex === endIndex ? [startIndex] : [startIndex, endIndex];

  return shardRange;
}

/**
 * Retrieves a range of scenario paths based on the provided shard range.
 *
 * @param {string[]} scenarioPaths - An array of scenario paths.
 * @param {number[]} shardRange - An array containing the start and end indices for the range.
 * @returns {string[]} The selected range of scenario paths.
 */
function getScenarioPathsByShardRange(scenarioPaths, shardRange) {
  if (!shardRange) {
    console.error("No scenarios to run");
    process.exit(1);
  }

  const [startIndex, endIndex] = shardRange;
  return endIndex
    ? scenarioPaths.slice(startIndex, endIndex + 1)
    : [scenarioPaths[startIndex]];
}

export { processShardInput, calculateShardRange, getScenarioPathsByShardRange };
