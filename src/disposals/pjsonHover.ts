import * as vscode from 'vscode';
import { validRange } from 'semver';
import { getLocation } from 'jsonc-parser';

export default vscode.languages.registerHoverProvider(
  { scheme: 'file', language: 'json', pattern: '**/package.json' },
  {
    async provideHover(document, position) {
      const offset = document.offsetAt(position);
      const location = getLocation(document.getText(), offset);
      if (
        !location.isAtPropertyKey &&
        (location.matches(['dependencies', '*']) ||
          location.matches(['devDependencies', '*']) ||
          location.matches(['optionalDependencies', '*']) ||
          location.matches(['peerDependencies', '*']))
      ) {
        const version = location.previousNode?.value;
        console.log('location', location);
        return new vscode.Hover(validRange(version) ?? '');
      }
    },
  }
);
