import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/**
 * Retrieves the version of the package from the package.json file.
 *
 * @return {string} The version of the package.
 */
function getPackageVersion() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const projectRoot = path.resolve(__dirname, '..', '..');

    const packageJsonPath = path.join(projectRoot, 'package.json');

    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    const version = packageJson.version;

    return version;
}

export { getPackageVersion };
