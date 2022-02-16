import * as vscode from "vscode";

const languages = ["scss", "sass", "stylus", "less", "css"];

const isHexColor = (str: string) => {
  return str.startsWith("#") && (str.length === 4 || str.length === 7);
};

const hex2rgb = (hex: string) => {
  hex = hex.slice(1);
  let r, g, b;
  if (hex.length === 3) {
    r = parseInt(`${hex[0]}${hex[0]}`, 16);
    g = parseInt(`${hex[1]}${hex[1]}`, 16);
    b = parseInt(`${hex[2]}${hex[2]}`, 16);
  } else {
    r = parseInt(`${hex[0]}${hex[1]}`, 16);
    g = parseInt(`${hex[2]}${hex[3]}`, 16);
    b = parseInt(`${hex[4]}${hex[5]}`, 16);
  }
  return `rgb(${r},${g},${b})`;
};

export default vscode.languages.registerHoverProvider(languages, {
  async provideHover(document, position) {    
    const range = document.getWordRangeAtPosition(position);
    const text = document.getText(range);

    if (isHexColor(text)) {
      return new vscode.Hover(hex2rgb(text));
    }
  },
});
