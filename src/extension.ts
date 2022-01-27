// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "preview-link" is now active!');
  console.log("test");

  const disposal = vscode.languages.registerHoverProvider("javascript", {
    provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);
      // TODO: recognize the links 
      return new vscode.Hover(word.startsWith("http") ? `[](${word})` : `![img](https://gw.alicdn.com/bao/uploaded/TB1drOePpXXXXX7aFXXXXXXXXXX-600-338.jpg)`);
    },
  });

  context.subscriptions.push(disposal);
}

// this method is called when your extension is deactivated
export function deactivate() {}
