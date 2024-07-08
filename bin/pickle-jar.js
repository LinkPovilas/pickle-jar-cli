#!/usr/bin/env node
"use strict";

const path = require("path");
const figlet = require("figlet");
const { program } = require("commander");

const getScenarioPaths = require("../src/gherkin.js");
const calculateShardRange = require("../src/shard.js");
const { exec } = require("child_process");

const bootstrap = () => {
  console.log(figlet.textSync("Pickle Jar"));
  program
    .name("pickle-jar")
    .version("1.0.0")
    .description("Pickle Jar CLI")
    .argument("<test-script>", "command script to run cucumber scenarios")
    .option("-s, --shard <index/total>", "run a subset of scenarios")
    .parse(process.argv);

  const testScript = program.args[0];
  const options = program.opts();

  if (options.shard) {
    if (!RegExp(/^\d+\/\d+$/).test(options.shard)) {
      throw new Error("Invalid shard input");
    }
    const [shardIndex, shardTotal] = options.shard.split("/").map(Number);

    const scenarioPaths = getScenarioPaths();
    const shardRange =
      scenarioPaths.length > 0
        ? calculateShardRange(shardIndex, shardTotal, scenarioPaths.length)
        : null;

    if (shardRange) {
      const result = scenarioPaths.slice(shardRange[0], shardRange[1] + 1);
      exec(`${testScript} ${result.join(" ")}`);
    }
  }
};

bootstrap();
