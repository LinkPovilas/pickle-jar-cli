import { textSync } from "figlet";
import { program } from "commander";
import { exec } from "node:child_process";

/**
 * Sets up the command-line interface (CLI) for the Pickle Jar application.
 *
 * @return {{testScript: string, options: {[x: string]: any;}}} An object containing the test script and CLI options.
 */
function setupCli() {
  console.log(textSync("Pickle Jar"));
  program
    .name("pickle-jar")
    .version("1.0.0")
    .description("Pickle Jar CLI")
    .argument("<test-script>", "command script to run cucumber scenarios")
    .option("-s, --shard <index/total>", "run a subset of scenarios")
    .parse(process.argv);

  const testScript = program.args[0];
  const options = program.opts();

  return { testScript, options };
}

/**
 * Executes a test script with the provided scenario paths.
 *
 * @param {string} testScript - The path or command for the test script to be executed.
 * @param {string[]} scenarioPathsToRun - An array of scenario paths to run.
 */
function executeTestScript(testScript, scenarioPathsToRun) {
  console.log(`Running ${scenarioPathsToRun.length} scenarios...`);
  exec(`${testScript} ${scenarioPathsToRun.join(" ")}`);
}

export { setupCli, executeTestScript };
