<p align="center">
<img width="100" src='./images/icon.png' alt='icon'>
</p>

<h1 align="center">Hover-Helper
<a href="https://marketplace.visualstudio.com/items?itemName=HomyeeKing.hover-helper" target="__blank">
<img src="https://img.shields.io/visual-studio-marketplace/v/HomyeeKing.hover-helper.svg?color=blue&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version" />
</a>
</h1>

<p align="center">
Provide tiny useful information when you hover.
</p>

# Features

## preview-img

> works in `"javascript", "typescript", "javascriptreact", "typescriptreact", "json", "jsonc"`

if the given url is a media url(image source), just show it in vscode, don't need to open it in the browser

```js
const img = 'https://miro.medium.com/max/1400/1*6ahbWjp_g9hqhaTDSJOL1Q.png'; // whole url
const img1 = '//miro.medium.com/max/1400/1*6ahbWjp_g9hqhaTDSJOL1Q.png'; // omit protocol, pretend it's https by default
const img2 =
  'https://img0.baidu.com/it/u=3486467821,3996728349&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'; // infer from response header
```

![preview img](https://user-images.githubusercontent.com/49113249/231378269-b1338286-8468-4f6c-8296-f77e965774fb.gif)

## hover in package.json

just hover on the semver and it will tell the valid range, you don't have to remember the advanced range syntax like `caret ranges` or `tilde ranges` etc anymore!
and you will know the current used version of hoverd package instantly!

![hover in pjson](https://user-images.githubusercontent.com/49113249/231374832-99dc007b-047a-463f-9d25-df58f104a04b.gif)

## toggle css properties

right click to open context, then toggle CSS to CSSProperties vice versa.

![toggle css](https://user-images.githubusercontent.com/49113249/231377555-2cc78bf1-bc32-4898-a6ac-bd090b773a2c.gif)


## add terminal icon at status bar

## remove all gitignore file/folders
> node_modules is exlcuded by default
![20230709124936](https://github.com/HomyeeKing/vscode-plugin-preview/assets/49113249/893085cb-29ea-4e32-827a-58b4948962c4)

![image](https://github.com/HomyeeKing/vscode-plugin-preview/assets/49113249/e97f3d24-8a22-438b-a749-cf9e098b4a73)

