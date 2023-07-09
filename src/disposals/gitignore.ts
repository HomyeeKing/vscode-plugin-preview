import * as vscode from 'vscode';
import { exec } from 'child_process';
import { join } from 'path';

export const deleteGitIgnores = vscode.commands.registerCommand(
  'extension.deleteIgnored',
  () => {
    const folder = vscode.workspace.workspaceFolders![0];
    exec(
      'git clean -xdn  --exclude=node_modules',
      {
        cwd: folder.uri.path,
      },
      (err, stdout, stderr) => {
        if (err) {
          vscode.window.showErrorMessage(err.message);
        }
        console.log('stdout', stdout.length);
        if (stdout.length) {
          vscode.window
            .showWarningMessage(
              stdout,
              {
                detail: 'Do you want to remove that all?',
                modal: true,
              },
              'Yes',
              'No'
            )
            .then((result) => {
              if (result === 'Yes') {
                exec('git clean -xdf  --exclude=node_modules', {
                  cwd: folder.uri.path,
                });
              } else {
                // 用户点击了取消按钮或关闭了提示框
              }
            });
        } else {
          vscode.window.showInformationMessage(
            'All gitignored file/folders have been removed.',
            {
              detail: 'node_modules is excluded by default',
              modal: true,
            }
          );
        }
      }
    );
  }
);
