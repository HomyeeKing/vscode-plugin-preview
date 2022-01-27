const imgExt =
  "bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp,avif,apng";
const imgRe = new RegExp(`\\.(${imgExt.replace(/,/g, "|")})`);

enum UrlType {
  IMG = "img",
  AUDIO = "audio",
  VIDEO = "video",
  WEBSITE = "website",
}

export function checkUrl(url: string): {
  type: UrlType;
} {
  if (imgRe.test(url)) {
    return {
      type: UrlType.IMG,
    };
  }
// TODO: get request header



  return {
    type: UrlType.WEBSITE,
  };
}
