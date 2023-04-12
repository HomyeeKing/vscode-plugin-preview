// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import mediaDisposal from './disposals/preview-img';
import pjsonHover from './disposals/pjsonHover';
import { toCSSProperties, toCSS } from './disposals/toggleCssProps';
// import askAI from './disposals/askAI';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "preview-link" is now active!');

  // languages id
  // https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers
  context.subscriptions.push(
    mediaDisposal,
    // extension on package.json
    pjsonHover,
    toCSSProperties,
    toCSS,
    // askAI
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
