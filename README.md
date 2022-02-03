# preview-link

show image directly when you hover the link, we will infer the link type internally.

# example

```js
const img = "https://miro.medium.com/max/1400/1*6ahbWjp_g9hqhaTDSJOL1Q.png"; // whole url
const img1 = "//miro.medium.com/max/1400/1*6ahbWjp_g9hqhaTDSJOL1Q.png"; // omit protocol, pretend it's https by default
const img2 =
  "https://img0.baidu.com/it/u=3486467821,3996728349&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"; // infer from response header
```

https://user-images.githubusercontent.com/49113249/152314862-fe7fac6a-dd61-47c4-97e7-50532d74ecb9.mov
