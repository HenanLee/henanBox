/*******************************
脚本功能：脚本解锁订阅集合
脚本作者：afengye
注意事项：查看频道说明
频道地址：https://t.me/afengye
使用声明：️仅供学习交流, 🈲️商业用途
********************************
[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/.+$) url script-response-body https://raw.githubusercontent.com/afengye/QX/main/crack.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/.+$) url script-request-header https://raw.githubusercontent.com/afengye/QX/main/crack.js
[mitm] 
hostname = api.revenuecat.com,api.rc-backup.com
*******************************/
let obj = {};

if(typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  obj.headers = $request.headers;
}else {
  let body = JSON.parse(typeof $response != "undefined" && $response.body || null);
  if(body && body.subscriber) {
    let date = {"expires_date": "2999-01-01T00:00:00Z","original_purchase_date":"2021-01-01T00:00:00Z","purchase_date": "2021-01-01T00:00:00Z","ownership_type": "PURCHASED","store": "app_store"};
    let subscriber = body.subscriber;
    const newObj = Object.fromEntries(Object.entries($request.headers).map(([k, v]) => [k.toLowerCase(), v]));
    let bundle_id = newObj["x-client-bundle-id"]?newObj["x-client-bundle-id"]:newObj["user-agent"].match(/^[%a-zA-Z0-9]+/)[0];
    const list = [
         {"app_name":"ArchiveList","bundle_id":"com.jy.ArchiveBox","product_id":"com.jy.ArchiveBox.pro_1","entitlements":["pro_life"],"version":"2.6.1"},
      {"app_name":"CountDuck","bundle_id":"co.countduck.app","product_id":"Lifetime","entitlements":["premium"],"version":"3.0.1"},

{"app_name":"记一杯","bundle_id":"me.xgmm.markacup","product_id":"202403180021","entitlements":["premiun"],"version":"1.5.4"},

{"app_name":"Inread","bundle_id":"Swipe-and-tap.inRead","product_id":"inRead.premium.monthly","entitlements":["premium_access"],"version":"1.4"},
      {"app_name":"Yosum","bundle_id":"terrykuo.co.yosum","product_id":"terrykuo.co.yosum.premiummembership","entitlements":["Premium"],"version":"2.5.5"},
      {"app_name":"HabitDone","bundle_id":"com.dison.HabitDone","product_id":"Lifetime","entitlements":["pro"],"version":"3.1.2"},
      {"app_name":"Thiro","bundle_id":"io.github.ctlvie.atelerix","product_id":"atelerix_pro_lifetime","entitlements":["pro"],"version":"1.3.12"},
      {"app_name":"js_code_pad","bundle_id":"com.markodevcic.js-code-pad","product_id":"js_code_pad_developer_upgrade","entitlements":
["developer"],"version":"1.8.5"},
      {"app_name":"HealthView","bundle_id":"com.funnmedia.HealthMinder","product_id":"com.funnmedia.HealthMinder.subscription.yearly.v2","entitlements":["healthview_premium"],"version":"3.9.0"},
      
{"app_name":"时间记录","bundle_id":"com.bapaws.Hours","product_id":"com.bapaws.Hours.lifetime","entitlements":["pro"],"version":"1.8.6"},
      {"app_name":"EventLine","bundle_id":"xyz.jiaolong.app.EventLine","product_id":"xyz.jiaolong.eventline.pro.lifetime","entitlements":["pro"],"version":"1.15.0"}
      {"app_name":"Tally","bundle_id":"com.rainbow.PlusOne","product_id":"tally.remove_ad","entitlements":["pro"],"version":"3.9.0"},
      {"app_name":"Days","bundle_id":"net.mattdavenport.daysuntil","product_id":"net.mattdavenport.daysuntil.dayspremiumlifetime","entitlements":["premium","pro"],"version":"3.15"},
      {"app_name":"1Blocker","bundle_id":"","product_id":"blocker.ios.iap.lifetime","entitlements":["premium"],"version":"5.8"},
      {"app_name":"stepapp","bundle_id":"com.gunthermarktl.stepapp","product_id":"app.steps.stepsapp.premium.year","entitlements":["stepapppro"],"version":"8.0.1"},

{"app_name":"HappyScale","bundle_id":"com.frontpocketsoftware.happyscale","product_id":"com.frontpocketsoftware.happyscale.premium.perpetual","entitlements":["premium"],"version":"2024.15"},
      {"app_name":"ZoomEarth","bundle_id":"com.neave.zoomearth","product_id":"ze_pro_annual_v1","entitlements":["pro"],"version":"3.1"},
      {"app_name":"FitnessView","bundle_id":"com.funnmedia.fitnessview","product_id":"fitnessview.premiumOnetime","entitlements":["fitnessview-premium"],"version":"2.5.7"},

   ];  
   for(let data of list){
     if(bundle_id == data.bundle_id || bundle_id == data.app_name){
       let product_id = data.product_id;
       let entitlements = data.entitlements;
       subscriber.subscriptions[(product_id)] = date;
       for (let entitlement of entitlements) {
         subscriber.entitlements[(entitlement)] = date;        
         subscriber.entitlements[(entitlement)].product_identifier = product_id; 
       }
       break; 
     }   
   }
   obj.body = JSON.stringify(body);
  }
}

$done(obj);

