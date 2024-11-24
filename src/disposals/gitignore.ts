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
      async (err, stdout, stderr) => {
        if (err) {
          vscode.window.showErrorMessage(err.message);
        }
        if (stdout.length) {
          const files = stdout.split('\n').filter(Boolean);

          // If more than 10 files, show preview panel
          if (files.length > 10) {
            // Create and show files list in a new editor
            const previewContent = [
              '# Files to be removed:',
              '------------------------',
              ...files.map((f) => `- ${f}`),
              '',
              '* To proceed with deletion, close this preview and confirm in the popup dialog.',
              '* To cancel, just close this preview and select "No" in the popup dialog.',
            ].join('\n');

            const document = await vscode.workspace.openTextDocument({
              content: previewContent,
              language: 'markdown',
            });

            await vscode.window.showTextDocument(document, {
              preview: true,
              viewColumn: vscode.ViewColumn.Beside,
            });
          }
          // Show confirmation dialog with appropriate message
          const message =
            files.length > 10
              ? `Found ${files.length} files to be removed. Please review the list in the preview panel.`
              : `Found ${files.length} files to be removed:\n${files.join(
                  '\n'
                )}`;

          // Show confirmation dialog
          await vscode.window
            .showWarningMessage(
              message,
              {
                detail: 'Do you want to remove all these files?',
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
