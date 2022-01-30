// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { checkUrl } from "./utils";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "preview-link" is now active!');

  const disposal = vscode.languages.registerHoverProvider("javascript", {
    async provideHover(document, position, token) {
      const URLregex =
        /(https?:\/\/)*[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      const range = document.getWordRangeAtPosition(position, URLregex);
      const url = document.getText(range);
      // return new vscode.Hover(`![text](${url})`);

      const urlType = await checkUrl(url);
      console.log("urlType :>> ", urlType);
      if (urlType.type === "img") {
        return new vscode.Hover(`![text](${url})`);
      }
    },
  });

  context.subscriptions.push(disposal);
}

// this method is called when your extension is deactivated
export function deactivate() {}
