// get obj ts type
import * as vscode from "vscode";

const langs = [
  "javascript",
  "typescript",
  "javascriptreact",
  "typescriptreact",
];

const obj = {
  a:1
} ;
export default vscode.languages.registerHoverProvider(langs, {
  async provideHover(document, position) {
    const range = document.getWordRangeAtPosition(position);
    const text = document.getText(range);

    console.log('text', text);
    return new vscode.Hover(text);
  },
});
