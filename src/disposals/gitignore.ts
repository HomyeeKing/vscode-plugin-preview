import * as vscode from 'vscode';
const path = require('path');
const glob = require('glob');

export const deleteGitIgnores = vscode.commands.registerCommand(
  'extension.deleteIgnored',
  async () => {
    const folder = vscode.workspace.workspaceFolders![0];
    const gitignore = vscode.Uri.joinPath(folder.uri, '.gitignore');

    const gitignoreContent = (
      await vscode.workspace.fs.readFile(gitignore)
    ).toString();
    if (!gitignoreContent) {
      return;
    }
    const patterns = gitignoreContent
      .split(/\n/)
      .filter((i) => i.trim())
      .filter((i) => i && !i.startsWith('#'));

    console.log('patterns', patterns);
    // const searchPath = folder.uri.fsPath;
    const res = await vscode.workspace.findFiles('**/*', '**/node_modules/**', 1000);
    console.log(res);

    // const options = { cwd: folder.uri.fsPath };
    // const matchedFiles = await Promise.all(
    //   patterns.map((p) => vscode.workspace.findFiles(p, '**/node_modules/**'))
    // );
    // console.log('matchedFiles', matchedFiles);
  }
);
