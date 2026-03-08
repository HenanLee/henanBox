*******************************
[rewrite_local]

^https?:\/\/api\.fengkuangapp\.com\/(account\/grant\/detail\/info|learning\/grant\/fav_words\/fav\/v2|wd\/grant\/plan\/extra\/config)\/ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/fkbdc.js

[mitm]
hostname = api.fengkuangapp.com
*******************************

var url = $request.url;
var body = JSON.parse($response.body);

// 1️⃣ VIP信息接口
if (url.indexOf("/account/grant/detail/info/") != -1) {

body.data.vip_info = {
    "id": 139,
    "title": "终身VIP",
    "subtitle": "终身VIP",
    "is_vip": 1,
    "is_permanent": 1,
    "product_id": "shark.crazyword.continuous",
    "price": "98",
    "original_price": "998",
    "continue_price": "98",
    "vip_start_time": "2026-01-01 00:00:00",
    "vip_end_time": "9999-01-01 00:00:00",
    "vip_days": 99999,
    "remain_days": 99999,
    "vip_type": 4,
    "vip_level": 10,
    "is_sale": 1,
    "time_limit": 1,
    "always": 0,
    "auto_buy": 1,
    "status": 1,
    "finish_date": "9999-01-01 00:00:00",
    "days": 999999
};

// VIP权限
body.data.group = 10;
body.data.role_id = 2;

// 自定义信息
body.data.nick = "@t.me/GieGie777";
body.data.photo = "http://ykhp-user-imges.yikaobang.com.cn/Uploads/Avatar/2024/08/18/66c188e2d4fab.jpg";

}

// 2️⃣ 生词本单词上限
if (url.indexOf("/learning/grant/fav_words/fav/v2/") != -1) {

body.code = 0;
body.msg = "success";

}

// 3️⃣ 会员功能限制
if (url.indexOf("/wd/grant/plan/extra/config/") != -1) {

body.code = 0;
body.msg = "success";

if (body.data) {

body.data.max_words = 999999;
body.data.word_limit = 999999;
body.data.max_wordbooks = 999;
body.data.wordbook_limit = 999;

body.data.ai_limit = 9999;
body.data.extra_on = 1;

}

}

$done({ body: JSON.stringify(body) });