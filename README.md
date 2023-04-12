<center><img src='./images/icon.png' alt='icon'></center>

# Hover-Helper

Provide tiny useful information when you hover.

# Features

## preview-img
> works in `"javascript", "typescript", "javascriptreact", "typescriptreact", "json", "jsonc"`

if the given url is a media url(image source), just show it in vscode, don't need to open it in the browser

```js
const img = "https://miro.medium.com/max/1400/1*6ahbWjp_g9hqhaTDSJOL1Q.png"; // whole url
const img1 = "//miro.medium.com/max/1400/1*6ahbWjp_g9hqhaTDSJOL1Q.png"; // omit protocol, pretend it's https by default
const img2 =
  "https://img0.baidu.com/it/u=3486467821,3996728349&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"; // infer from response header
```

![Kapture 2022-02-16 at 22 33 36](https://user-images.githubusercontent.com/49113249/154286829-e84ab93c-cb84-4d2e-9705-43413d84d660.gif)


## hover in package.json
just hover on the semver and it will tell the valid range, you don't have to remember the advanced range syntax like `caret ranges` or `tilde ranges` etc anymore!
and you will know the current used version of hoverd package instantly!

![hover in pjson](https://user-images.githubusercontent.com/49113249/231374832-99dc007b-047a-463f-9d25-df58f104a04b.gif)


## toggle css properties

right click to open context, then toggle CSS to CSSProperties vice versa.

![toggle css](https://user-images.githubusercontent.com/49113249/231377555-2cc78bf1-bc32-4898-a6ac-bd090b773a2c.gif)



