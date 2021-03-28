let srcUrl = $request.url;

let dstUrlRegex = /https?:\/\/.+/;
let host = srcUrl.split('/')[2];
let pathEncode = srcUrl.substring(srcUrl.indexOf(host) + host.length)
let pathDecode = decodeURIComponent(pathEncode);
let dstUrl = pathDecode.match(dstUrlRegex)[0];

$done({
  response: {
    status: 302,
    headers: { Location: dstUrl },
  },
});