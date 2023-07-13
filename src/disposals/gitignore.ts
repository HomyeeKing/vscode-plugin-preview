import * as vscode from 'vscode';
import { exec } from 'child_process';

export const deleteGitIgnores = vscode.commands.registerCommand(
  'extension.deleteIgnored',
  () => {
    const folder = vscode.workspace.workspaceFolders![0];
    exec(
      'git clean -Xdn  --exclude=node_modules',
      {
        cwd: folder.uri.path,
      },
      (err, stdout, stderr) => {
        if (err) {
          vscode.window.showErrorMessage(err.message);
        }
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
              const abortController = new AbortController();
              const { signal } = abortController;
              if (result === 'Yes') {
                vscode.window.withProgress(
                  {
                    location: vscode.ProgressLocation.Notification, // 进度条位置
                    title:
                      'Removing git ignored, it might takes some time, please hold on...', // 进度条标题
                    cancellable: true, // 是否可以取消进度条
                  },
                  async (progress, token) => {
                    token.onCancellationRequested(() => {
                      abortController.abort();
                    });
                    return new Promise<void>((resolve, reject) => {
                      exec(
                        'git clean -Xdf  --exclude=node_modules',
                        {
                          cwd: folder.uri.path,
                          signal,
                        },
                        (err, stdout) => {
                          if (err) {
                            reject(err);
                          }
                          resolve();
                        }
                      );
                    });
                  }
                );
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
