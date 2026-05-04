[rewrite_local]
^http:\/\/103\.45\.131\.38:40001\/api\/update\/getVersionInf\.do url script-response-body no_update.js

[mitm]
hostname = 103.45.131.38


let obj = JSON.parse($response.body);

if (obj.data) {
  obj.data.enable = false;
  obj.data.verCode = "0";
  obj.data.detail = "";
  obj.data.downloadUrl = "";
  obj.data.exDownloadUrl = "";
}

$done({body: JSON.stringify(obj)});