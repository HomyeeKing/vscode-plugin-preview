import * as vscode from 'vscode';
import { checkUrl } from './utils';


export default  vscode.languages.registerHoverProvider(
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
      console.log('media preview in');
      
      const urlRe =
        /(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=,\*!]*)/gi;

      const range = document.getWordRangeAtPosition(position, urlRe);
      if (range) {
        let url = document.getText(range);
        if (url.startsWith("//")) {
          url = `https:${url}`;
        }
        url = encodeURI(url);
        console.log('url', url);
        const mdStr = new vscode.MarkdownString();
        mdStr.supportHtml = true;
        mdStr.value = "";
        const urlType = await checkUrl(url);
        console.log('urlType', urlType);
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
          case 'invalid':
            mdStr.value = `the matched url is ${url}, please file an issue [here](${require('../package.json').bugs.url})`;
            break;
          default:
            break;
        }

        return new vscode.Hover(mdStr);
      }
    },
  }
);