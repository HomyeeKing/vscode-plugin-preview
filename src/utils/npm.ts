import { exec } from 'child_process';

interface ViewPackageInfo {
  curUsedVersion?: string;
}

export function isValidNPMName(name: string): boolean {
  // following rules from https://github.com/npm/validate-npm-package-name
  if (!name || name.length > 214 || name.match(/^[_.]/)) {
    return false;
  }
  const match = name.match(/^(?:@([^/]+?)[/])?([^/]+?)$/);
  if (match) {
    const scope = match[1];
    if (scope && encodeURIComponent(scope) !== scope) {
      return false;
    }
    const name = match[2];
    return encodeURIComponent(name) === name;
  }
  return false;
}

export function npmList(pack: string, cwd: string): Promise<ViewPackageInfo> {
  return new Promise((resolve, reject) => {
    exec(`npm list --json ${pack}`, { cwd }, (error, lsStdout) => {
      if (!error) {
        try {
          const lsContent = JSON.parse(lsStdout);
          resolve({
            curUsedVersion: lsContent.dependencies[pack].version,
          });
        } catch (error) {}
      }
      resolve({});
    });
  });
}
