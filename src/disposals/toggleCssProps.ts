import * as vscode from 'vscode';

const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null);
  return ((str: string) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }) as T;
};
const camelizeRE = /-(\w)/g;
/**
 * @private
 */
export const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});

const hyphenateRE = /\B([A-Z])/g;
/**
 * @private
 */
export const hyphenate = cacheStringFunction((str: string) =>
  str.replace(hyphenateRE, '-$1').toLowerCase()
);

/**
 * border-width: 1px solid #000  ---> borderWidth:'1px solid #000'
 * @param props css props
 * @returns
 */
function convertCSSToCssProperties(props: string[]) {
  return props
    .map((p) => {
      const _p = p.trim();
      if (_p) {
        const [key, value] = _p.split(/:(?!\/\/)/);
        return `${camelize(key.trim())}: \`${value.trim()}\``;
      }
    })
    .join(',\n');
}
/**
 * borderWidth:'1px solid #000' ---> border-width: 1px solid #000
 * @param props cssproperites props
 * @returns
 */
function convertCssPropertiesToCSS(props: string[]) {
  return props
    .map((p) => {
      const _p = p.trim();
      if (_p) {
        // badcase: url(https://)
        let [key, value] = _p.split(/:(?!\/\/)/);
        value = value.trim();
        return `${hyphenate(key.trim())}: ${value.slice(1, value.length - 1)}`;
      }
    })
    .join(';\n');
}

export const toCSSProperties = vscode.commands.registerCommand(
  'extension.convertToCSSProperties',
  () => {
    // const isCSSFile = (schema.path as string).endsWith('.css');
    // // jsx or tsx
    // const isSXFile =
    //   (schema.path as string).endsWith('.jsx') ||
    //   (schema.path as string).endsWith('.tsx');
    const editor = vscode.window.activeTextEditor;
    for (const selection of editor?.selections || []) {
      const selectionText = editor?.document.getText(selection);
      editor?.edit((builder) => {
        builder.replace(
          selection,
          convertCSSToCssProperties(selectionText?.split(';') || [])
        );
      });
    }
  }
);
export const toCSS = vscode.commands.registerCommand(
  'extension.convertToCSS',
  () => {
    const editor = vscode.window.activeTextEditor;
    for (const selection of editor?.selections || []) {
      const selectionText = editor?.document.getText(selection);
      editor?.edit((builder) => {
        builder.replace(
          selection,
          // bad-case  rgba(a,g,b)
          convertCssPropertiesToCSS(selectionText?.split(/(?<='|"|`),/) || [])
        );
      });
    }
  }
);
