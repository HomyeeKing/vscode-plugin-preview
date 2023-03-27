import * as vscode from 'vscode';
import { cssDescriptorRe } from '../const';
import { askAI } from '../openAI';

const langs = [
  'javascript',
  'typescript',
  'javascriptreact',
  'typescriptreact',
  ...cssDescriptorRe,
];

const handleAskAICommand = async (prompt?: string) => {
  const input =
    prompt ??
    (await vscode.window.showInputBox({
      placeHolder: 'input to askAI',
    }));

  if (!input) {
    return;
  }
  vscode.window
    .withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: `asking ${input} ...`,
        cancellable: true,
      },
      async (_, cancelToken) => {
        const abortController = new AbortController();
        cancelToken.onCancellationRequested(() => {
          abortController.abort();
        });
        const { signal: abortSignal } = abortController;
        // to task
        return (await askAI(input, { abortSignal }))!;
      }
    )
    .then(async ({ type, data: ans }) => {
      // handle result and close it automatically
      if (type === 'OK') {
        const pick = await vscode.window.showInformationMessage(
          ans || '',
          'Continue',
          'Cancel'
        );
        if (pick === 'Continue') {
          handleAskAICommand();
        }
      } else {
        const pick = await vscode.window.showErrorMessage(
          ans || '',
          'Retry',
          'Cancel'
        );
        if (pick === 'Retry') {
          handleAskAICommand(input);
        }
      }
    });
};

export default vscode.commands.registerCommand('extension.askAI', () => {
  handleAskAICommand();
});
