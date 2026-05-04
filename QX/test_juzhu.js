[rewrite_local]
^http:\/\/103\.45\.131\.38:40001\/api\/update\/getVersionInf\.do url script-response-body https://raw.githubusercontent.com/HenanLee/henanBox/main/QX/test_juzhu.js

[mitm]
hostname = 103.45.131.38


let body = $response.body;

try {
  let obj = JSON.parse(body);

  if (obj.data) {
    obj.data.enable = false;
    obj.data.verCode = "0";
    obj.data.detail = "";
    obj.data.downloadUrl = "";
    obj.data.exDownloadUrl = "";
  }

  $done({ body: JSON.stringify(obj) });

} catch (e) {
  console.log("解析失败，原始返回：", body);
  $done({});
}