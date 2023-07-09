import path = require('path');
import * as vscode from 'vscode';

//#region terminal icon
const statusBar = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right,
  0
);
statusBar.command = {
  title: 'open terminal cwd',
  command: 'workbench.action.terminal.focus',
  tooltip: 'Open CWD Terminal',
};
statusBar.text = '$(terminal)';
statusBar.show();
//#endregion

export const terminal = vscode.commands.registerCommand(
  'extension.openInTerminal',
  () => {
    const activeEditor = vscode.window.activeTextEditor;

    if (activeEditor) {
      vscode.commands.executeCommand('workbench.action.terminal.newWithCwd', {
        cwd: path.dirname(activeEditor.document.uri.path),
      });
    }
  }
);
