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
  const disposal = vscode.languages.registerHoverProvider(
    [
      "javascript",
      "typescript",
      "javascriptreact",
      "typescriptreact",
      "json",
      "jsonc",
    ],
    {
      async provideHover(document, position) {
        const urlRe =
          /(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=,\*]*)/gi;

        const range = document.getWordRangeAtPosition(position, urlRe);
        if (range) {
          let url = document.getText(range);
          if (url.startsWith("//")) {
            url = `https:${url}`;
          }
          url = encodeURI(url);
          const mdStr = new vscode.MarkdownString();
          mdStr.supportHtml = true;
          mdStr.value = "";
          const urlType = await checkUrl(url);
          switch (urlType.type) {
            case "img":
              mdStr.value = `![hover-link-image](${url})`;
              break;
            // case "audio":
            //   mdStr.value = `<audio controls src='${url}' >
            //     vscode doesn't support audio, you can click Follow link for more details
            //   </audio>`;
            //   break;
            // case "video":
            //   mdStr.value = `<video controls src='${url}' width="250">
            //    vscode doesn't support video, you can click Follow link for more details
            //   </video>`;
            //   break;
            default:
              break;
          }

          return new vscode.Hover(mdStr);
        }
      },
    }
  );

  context.subscriptions.push(disposal);
}

// this method is called when your extension is deactivated
export function deactivate() {}
