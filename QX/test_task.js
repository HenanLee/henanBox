const url = "https://gofans.cn/limited/ios";
const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
};

// QX 支持 $task.fetch 或 $httpClient.get
(async () => {
  try {
    const response = await $task.fetch({ url, headers });
    handleResponse(response.body);
  } catch (error) {
    console.log("获取应用信息失败:", error);
    $done();
  }
})();

function handleResponse(body) {
  const appList = parseAppList(body);
  const freeAppList = appList.filter(app => app.price === "Free");

  if (freeAppList.length === 0) {
    $notify("AppStore限免APP", "", "今日暂无限免应用");
    $done();
    return;
  }

  let notificationContent = "";
  const appCount = 8; // 显示前8个
  for (let i = 0; i < freeAppList.length && i < appCount; i++) {
    const app = freeAppList[i];
    notificationContent += `🆓${app.name}｜原价￥${app.originalPrice}\n`;
  }

  $notify("AppStore限免APP", "", notificationContent);
  $done();
}

function parseAppList(html) {
  const regex = /<div[^>]+class="column[^"]*"[^>]*>[\s\S]*?<strong[^>]+class="title[^"]*"[^>]*>(.*?)<\/strong>[\s\S]*?<b[^>]*>(.*?)<\/b>[\s\S]*?<div[^>]+class="price-original[^"]*"[^>]*>[^<]*<del[^>]*>(.*?)<\/del>[\s\S]*?<p[^>]+class="intro[^"]*"[^>]*>([\s\S]*?)<\/p>/g;
  const appList = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const name = match[1];
    const price = match[2];
    const originalPrice = parseFloat(match[3]).toFixed(1);
    const description = match[4].replace(/<.*?>/g, '').replace(/\n+/g, ' ').trim();
    appList.push({ name, price, originalPrice, description });
  }
  return appList;
}