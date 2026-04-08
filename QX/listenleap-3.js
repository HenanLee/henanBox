


var obj = {};
try {
    obj = JSON.parse($response.body);
} catch (e) {
    $done({});
}

// ========================
// 1. 全局强制成功
// ========================
obj.code = 200;
obj.msg = "success";

// ========================
// 2. 处理 data 为空情况（关键）
// ========================
if (!obj.data) {
    obj.data = {};
}

// ========================
// 3. 强制 VIP
// ========================
obj.data.vip = true;
obj.data.vipType = "VIP";
obj.data.vipStartTime = "2020-01-01T00:00:00Z";
obj.data.vipExpireTime = "2099-12-31T23:59:59Z";

// user 层
if (obj.data.user) {
    obj.data.user.vip = true;
    obj.data.user.vipExpireTime = "2099-12-31T23:59:59Z";
}

// ========================
// 4. 解锁字幕（重点！！！）
// ========================
function unlock(item) {
    if (!item) return;

    // 强制状态完成
    item.asrStatus = "success";
    item.translateStatus = "success";
    item.aiStatus = 1;
    item.complete = 1;

    // 如果没有字幕，尝试伪造（防闪退）
    if (!item.subtitlesUrl) {
        item.subtitlesUrl = "";
    }

    if (!item.subtitlesAnalysisUrl) {
        item.subtitlesAnalysisUrl = "";
    }

    return item;
}

// list 结构
if (obj.data.records && Array.isArray(obj.data.records)) {
    obj.data.records = obj.data.records.map(unlock);
}

// itemList 结构（你新抓到的）
if (obj.data.itemList && obj.data.itemList.records) {
    obj.data.itemList.records = obj.data.itemList.records.map(unlock);
}

// 单个详情
if (obj.data.item) {
    obj.data.item = unlock(obj.data.item);
}

// ========================
// 5. 特判：上传接口（避免直接报错）
// ========================
if ($request.url.indexOf("generateUploadUrl") !== -1) {
    obj.data = {
        uploadUrl: "https://example.com/fake",
        fileName: "test.webm"
    };
}

// ========================
$done({ body: JSON.stringify(obj) });