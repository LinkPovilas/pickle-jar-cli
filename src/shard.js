"use strict";

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
    return null;
  }

  if (shardIndex > totalTests) {
    return null;
  }

  const testsPerShard = Math.max(Math.floor(totalTests / shardTotal), 1);
  const additionalScenario =
    shardIndex === shardTotal ? totalTests % shardTotal : 0;

  const startIndex = (shardIndex - 1) * testsPerShard;
  const endIndex = shardIndex * testsPerShard - 1 + additionalScenario;

  return startIndex === endIndex ? [startIndex] : [startIndex, endIndex];
}

module.exports = calculateShardRange;
