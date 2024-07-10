"use strict";

const fs = require("fs");
const { glob } = require("glob");
const { IdGenerator } = require("@cucumber/messages");

const {
  AstBuilder,
  GherkinClassicTokenMatcher,
  Parser,
} = require("@cucumber/gherkin");

const featureFilesPattern = "features/**/*.feature";

/**
 * Retrieves the paths of all scenarios in the feature files.
 *
 * @return {Array<string>} An array of strings representing the paths of all scenarios.
 * Each path is in the format "file:line".
 * @throws {Error} If there is an error parsing the feature files.
 */
function getScenarioPaths() {
  try {
    const builder = new AstBuilder(IdGenerator.uuid());
    const matcher = new GherkinClassicTokenMatcher();
    const parser = new Parser(builder, matcher);
    const featureFiles = glob.sync(featureFilesPattern);

    const scenarioPaths = featureFiles.flatMap((file) => {
      const content = fs.readFileSync(file, "utf8");
      const gherkinDocument = parser.parse(content);

      return gherkinDocument.feature.children
        .filter((child) => child.scenario)
        .flatMap((child) => {
          const line = child.scenario.location.line;
          const examples = child.scenario.examples;

          if (examples.length > 0) {
            return examples.flatMap((example) =>
              example.tableBody.map((row) => `${file}:${row.location.line}`)
            );
          }

          return [`${file}:${line}`];
        });
    });

    if (scenarioPaths.length === 0) {
      console.error("No scenarios found");
      process.exit(1);
    }

    return scenarioPaths;
  } catch (error) {
    console.error("Error in parsing feature files:", error);
    throw error;
  }
}

module.exports = { getScenarioPaths };
