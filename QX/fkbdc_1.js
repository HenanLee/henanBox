/*
 *
 *
*******************************
CrazyWord 本地无限生词本
功能：

1. VIP解锁
2. 收藏单词无限
3. 本地保存生词
4. 打开生词本自动合并本地数据

说明：
本地生词存在 QX 本地存储
卸载 QX 或清缓存会消失

*******************************
[rewrite_local]

^https?:\/\/api\.fengkuangapp\.com\/(account\/grant\/detail\/info|learning\/grant\/fav_words\/fav\/v2|wd\/grant\/plan\/extra\/config)\/ url script-response-body https://github.com/HenanLee/henanBox/raw/refs/heads/main/QX/fkbdc_1.js

[mitm]
hostname = api.fengkuangapp.com
*******************************
*
*
*/


*/

const url = $request.url;
let body = JSON.parse($response.body);

const KEY = "crazyword_local_words";

// ===== VIP =====
if (url.includes("/account/grant/detail/info/")) {

body.data.vip_info = {
"id":139,
"title":"终身VIP",
"is_vip":1,
"is_permanent":1,
"vip_end_time":"9999-01-01 00:00:00",
"vip_days":99999
};

body.data.group = 10;
body.data.role_id = 2;

}

// ===== 收藏单词 =====
if (url.includes("/learning/grant/fav_words/fav/v2/")) {

body.code = 0;
body.msg = "success";

try {

let word = $request.body;

let local = $prefs.valueForKey(KEY);

let arr = local ? JSON.parse(local) : [];

arr.push({
id: Date.now(),
data: word
});

$prefs.setValueForKey(JSON.stringify(arr), KEY);

} catch(e){}

}

// ===== 生词本配置 =====
if (url.includes("/wd/grant/plan/extra/config/")) {

body.code = 0;

if(body.data){

body.data.max_words = 999999;
body.data.word_limit = 999999;

}

}

// ===== 读取生词本 =====
if (url.includes("/learning") && body.data && body.data.list){

let server = body.data.list;

let local = $prefs.valueForKey(KEY);

if(local){

let arr = JSON.parse(local);

arr.forEach(i=>{

server.push({
id: i.id,
word: "local_word",
mean: "本地收藏"
});

});

}

body.data.list = server;

}

$done({body:JSON.stringify(body)});