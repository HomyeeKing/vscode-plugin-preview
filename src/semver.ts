import * as vscode from "vscode";
import { validRange } from "semver";

export default vscode.languages.registerHoverProvider(
  { scheme: "file", language: "json", pattern: "**/package.json" },
  {
    async provideHover(document, position) {
      const range = document.getWordRangeAtPosition(position);
      const text = document.getText(range);
      const validRangeText = validRange(text.split(`"`)[1]);

      return new vscode.Hover(validRangeText ?? "");
    },
  }
);
