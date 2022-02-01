import fetch from "node-fetch";

/**
 * use node-fetch@2
 * see https://stackoverflow.com/questions/70590704/fetching-in-a-vscode-extension-node-fetch-and-nodehttp-issues
 * for more details
 */
const imgExt =
  "bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp,avif,apng";
const imgRe = new RegExp(`\\.(${imgExt.replace(/,/g, "|")})`);

type UrlType = "img" | "audio" | "video" | "website";

export async function checkUrl(url: string): Promise<Record<"type", UrlType>> {
  if (imgRe.test(url)) {
    return {
      type: "img",
    };
  }
  const res = await fetch(url);
  const contentType = res.headers.get("content-type");
  if (contentType?.startsWith("image/")) {
    return {
      type: "img",
    };
  }
  if (contentType?.startsWith("audio/")) {
    return {
      type: "audio",
    };
  }
  if (contentType?.startsWith("video/")) {
    return {
      type: "video",
    };
  }

  {
    return {
      type: "website",
    };
  }
}
