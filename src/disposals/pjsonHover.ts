import * as vscode from 'vscode';
import { validRange } from 'semver';
import { getLocation } from 'jsonc-parser';
import { isValidNPMName, npmList } from '../utils/npm';
import { dirname } from 'path';

export default vscode.languages.registerHoverProvider(
  { scheme: 'file', language: 'json', pattern: '**/package.json' },
  {
    async provideHover(document, position) {
      const offset = document.offsetAt(position);
      const location = getLocation(document.getText(), offset);
      const cwd =
        document.uri && document.uri.scheme === 'file'
          ? dirname(document.uri.fsPath)
          : undefined;

      if (
        location.matches(['dependencies', '*']) ||
        location.matches(['devDependencies', '*']) ||
        location.matches(['optionalDependencies', '*']) ||
        location.matches(['peerDependencies', '*'])
      ) {
        if (location.isAtPropertyKey) {
          const pack = location.previousNode?.value;
          if (isValidNPMName(pack)) {
            const { curUsedVersion } = await npmList(pack, cwd!);
            return new vscode.Hover(
              curUsedVersion
                ? `Current used version: ${curUsedVersion}`
                : ''
            );
          }
        } else {
          const version = location.previousNode?.value;
          return new vscode.Hover(validRange(version) ?? '');
        }
      }
    },
  }
);
