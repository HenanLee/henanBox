// Fused_iTunes.js - 融合 iTunes 合集和 Polly Kann 解锁
// 基于 APPheji_iTunes.js (Guding88) 和 pollykann.js (Yu9191)
// 功能：支持合集中的多个 App 和 Polly Kann 的内购解锁
// 适配 Loon，拦截 buy.itunes.apple.com/verifyReceipt

try {
  // 解析响应
  let guding = JSON.parse($response.body || '{}');
  let url = $request.url;
  let headers = $request.headers;
  let UA = headers['User-Agent'] || headers['user-agent'] || '';

  // Polly Kann 专用逻辑
  if (url.includes('buy.itunes.apple.com/verifyReceipt') && (UA.includes('com.pollykann.app') || guding.receipt?.bundle_id === 'com.pollykann.app')) {
    guding = {
      "environment": "Production",
      "receipt": {
        "receipt_type": "Production",
        "app_item_id": 6450832499,
        "receipt_creation_date": "2024-01-17 14:17:21 Etc/GMT",
        "bundle_id": "com.pollykann.app",
        "original_purchase_date": "2024-01-17 14:17:21 Etc/GMT",
        "in_app": [
          {
            "quantity": "1",
            "purchase_date_ms": "1705501038000",
            "expires_date": "2099-09-09 14:17:18 Etc/GMT",
            "expires_date_pst": "2099-09-09 06:17:18 America/Los_Angeles",
            "is_in_intro_offer_period": "false",
            "transaction_id": "320001692332200",
            "is_trial_period": "false",
            "original_transaction_id": "320001692332200",
            "purchase_date": "2024-01-17 14:17:18 Etc/GMT",
            "product_id": "vip.forever.pollykann",
            "original_purchase_date_pst": "2024-01-17 06:17:21 America/Los_Angeles",
            "in_app_ownership_type": "PURCHASED",
            "original_purchase_date_ms": "1705501041000",
            "web_order_line_item_id": "320000788106651",
            "expires_date_ms": "4092595200000",
            "purchase_date_pst": "2024-01-17 06:17:18 America/Los_Angeles",
            "original_purchase_date": "2024-01-17 14:17:21 Etc/GMT"
          }
        ],
        "adam_id": 6450832499,
        "receipt_creation_date_pst": "2024-01-17 06:17:21 America/Los_Angeles",
        "request_date": "2024-01-17 14:17:36 Etc/GMT",
        "request_date_pst": "2024-01-17 06:17:36 America/Los_Angeles",
        "version_external_identifier": 858380808,
        "request_date_ms": "1705501056419",
        "original_purchase_date_pst": "2024-01-17 06:17:21 America/Los_Angeles",
        "application_version": "1",
        "original_purchase_date_ms": "1705501041000",
        "receipt_creation_date_ms": "1705501041000",
        "original_application_version": "1",
        "download_id": null
      },
      "pending_renewal_info": [
        {
          "product_id": "vip.forever.pollykann",
          "original_transaction_id": "320001692332200",
          "auto_renew_product_id": "com.pollykann.app.monthlyvip",
          "auto_renew_status": "1"
        }
      ],
      "status": 0,
      "latest_receipt_info": [
        {
          "quantity": "1",
          "purchase_date_ms": "1705501038000",
          "expires_date": "2099-09-09 14:17:18 Etc/GMT",
          "expires_date_pst": "2099-09-09 06:17:18 America/Los_Angeles",
          "is_in_intro_offer_period": "false",
          "transaction_id": "320001692332200",
          "is_trial_period": "false",
          "original_transaction_id": "320001692332200",
          "purchase_date": "2024-01-17 14:17:18 Etc/GMT",
          "product_id": "vip.forever.pollykann",
          "original_purchase_date_pst": "2024-01-17 06:17:21 America/Los_Angeles",
          "in_app_ownership_type": "PURCHASED",
          "subscription_group_identifier": "21360520",
          "original_purchase_date_ms": "1705501041000",
          "web_order_line_item_id": "320000788106651",
          "expires_date_ms": "4092595200000",
          "purchase_date_pst": "2024-01-17 06:17:18 America/Los_Angeles",
          "original_purchase_date": "2024-01-17 14:17:21 Etc/GMT"
        }
      ]
    };
    // 返回 Polly Kann 响应
    $done({ body: JSON.stringify(guding) });
  }

  // 合集逻辑：处理其他 App（来自 APPheji_iTunes.js）
  // 规范化 Headers
  for (var key in headers) {
    const reg = /^[a-z]+$/;
    if (key === "User-Agent" && !reg.test(key)) {
      var lowerkey = key.toLowerCase();
      headers[lowerkey] = headers[key];
      delete headers[key];
    }
  }

  // 定义合集的 uaProductMapping
  var uaProductMapping = {
    'ScreenRecord': { product_id: 'https://t.me/Guding88' },
    'bazaart': { product_id: 'Bazaart_Premium_Monthly_v9' },
    '%E6%8B%8D%E7%89%B9%E5%86%85%E5%A4%B4': { product_id: 'Patternator_Lock_Screen_Monthly' },
    'Revive': { product_id: 'revive.inapp.pro.lt_wotrial_42.99' },
    'Picsew': { product_id: 'com.sugarmo.ScrollClip.pro', bundle_id: 'com.sugarmo.ScrollClip' },
    'Air': { product_id: 'co.airapps.calculator.yearly' },
    'HashPhotos': { product_id: 'com.kobaltlab.HashPhotos.iap.allinone.free' },
    'ProxyFi': { product_id: 'week.proxyfi.sub' },
    'Side': { product_id: 'com.johnil.side.year' },
    'MyMemoryDebris': { product_id: 'com.chenxi.shannian.superNian' },
    'FileArtifact': { product_id: 'com.shengzhou.fileartifact.year' },
    'ChickAlarmClock': { product_id: 'Pro_M01' },
    'TWWeatherMajor': { product_id: 'com.highonemob.weather.base.w' },
    'ProKnockOut': { product_id: 'com.knockout.1monthplus.2weektrail' },
    'PutApp': { product_id: 'com.maliquankai.appdesign' },
    'CCD_Camera': { product_id: 'https://t.me/Guding88' },
    'CHAT%20AI': { product_id: 'https://t.me/Guding88' },
    'Koloro': { product_id: 'https://t.me/Guding88' },
    'AllMyBatteries': { product_id: 'https://t.me/Guding88' },
    'ReLens': { product_id: 'com.risingcabbage.pro.camera.yearlysubscription' },
    'Fashion%20Design%20Sketches': { product_id: 'com.pocketartstudio.fashiondesign.twomonths' },
    'StylishText': { product_id: 'com.app.StylishText.sub.monthly' },
    '%E5%BF%AB%E6%8D%B7%E6%8C%87%E4%BB%A4%E5%BA%93%E5%85%85%E7%94%B5%E5%8A%A8%E7%94%BB%E5%B0%8F%E7%BB%84%E4%BB%B6': { product_id: 'com.othermaster.yearlyvip' },
    'IslandWappScreen': { product_id: 'islandweek1342' },
    'VPN': { product_id: 'com.yearMember' },
    'oldroll': { product_id: 'com.zijayrate.analogcam.vipforever10' },
    'Subscriptions': { product_id: 'com.touchbits.subscriptions.iap.pro.yearly' },
    'intolive': { product_id: 'me.imgbase.intolive.proSubYearly' },
    'PocketPics': { product_id: 'pocketpics_monthly_withtrial_0901' },
    'CardDiary': { product_id: 'FuYuan.inkDiary.YearB.Pro' },
    '%E7%86%8A%E6%8E%8C%E8%AE%B0': { product_id: 'net.shinyfrog.bear_iOS.pro_yearly_subscription_bis' },
    '%E6%97%A5%E8%AE%B02.0': { product_id: 'com.LuoWei.aDiary.yearly0' },
    'LifeTracker': { product_id: 'com.dk.lifetracker.yearplan' },
    'newFitnessApp': { product_id: 'newfitnessapp02' },
    'CostMemo': { product_id: 'org.zrey.money.lifetime' },
    'LifeTime': { product_id: 'com.marklabs.lovetime.year' },
    'iTimely': { product_id: 'org.zrey.iTimely.lifetime' },
    'DoMemo': { product_id: 'org.zrey.fastnote.lifetime' },
    'VDIT': { product_id: 'me.imgbase.videoday.profeaturesYearly' },
    'xTerminal': { product_id: 'xterminal.pro2' },
    'MoodTracker': { product_id: 'co.vulcanlabs.moodtracker.lifetime2' },
    'Fotoz': { product_id: 'com.kiddy.fotoz.ipa.pro' },
    'Count': { product_id: 'counter.sub.gr1.1w' },
    'Wext': { product_id: 'com.lmf.wext.year' },
    'Scanner': { product_id: 'scannerapp.free.premium.subscription.m1mte' },
    'Metion': { product_id: 'org.zrey.metion.pro' },
    'Ever%20Play': { product_id: 'com.zhangchao.AudioPlayer.subscription.oneYear' },
    'Carbon%20VPN': { product_id: 'Prog_oneYear_auto' },
    'RealTuner': { product_id: 'com.gismart.tuner.weekly' },
    'ShellBean': { product_id: 'com.ningle.shellbean.subscription.year' },
    'MomentShouZhang': { product_id: 'xichaoshouzhangQuarterlyPlus' },
    'XinQingRiJi': { product_id: 'zhiwenshouzhangQuarterlyPlus' },
    'MoMoShouZhang': { product_id: 'shunchangshouzhangQuarterlyPlus' },
    'BuBuSZ': { product_id: 'quaVersion' },
    'LingLongShouZ': { product_id: 'zhenwushouzhangPlusVersion' },
    'Dart': { product_id: 'xyz.iofree.lifelog.pro.yearly' },
    'Pixiu%E8%AE%B0%E8%B4%A6': { product_id: 'com.RuoG.Pixiu.VIPYear' },
    'Lister': { product_id: 'com.productlab.lister.yearly' },
    'Daylio': { product_id: 'net.daylio.one_year_pro' },
    'Nutrilio': { product_id: 'net.nutrilio.one_year_plus' },
    'YSBrowser': { product_id: 'com.ys.pro' },
    '%E5%B0%8F%E6%97%A5%E5%B8%B8': { product_id: 'membership' },
    'Miary': { product_id: 'lifetime_sub' },
    'Mindkit': { product_id: 'mindkit_yearly' },
    'EnhanceFox': { product_id: 'com.risingcabbage.enhancefox.yearlysubscribewithtreetrial' },
    'Snoring': { product_id: 'com.koshel.snore.premiumYearThreeDaysTria' },
    'com.brother.pdfreaderprofree': { product_id: 'com.pdfreaderpro.free.member.all_access_pack_permanent_license.001' }
  };

  // 通用收据模板
  var receipt = {
    "quantity": "1",
    "purchase_date_ms": "1686002766000",
    "expires_date": "2099-09-09 06:06:06 Etc/GMT",
    "expires_date_pst": "2099-09-09 06:06:06 America/Los_Angeles",
    "is_in_intro_offer_period": "false",
    "transaction_id": "666666666666666",
    "is_trial_period": "false",
    "original_transaction_id": "666666666666666",
    "purchase_date": "2023-06-06 06:06:06 Etc/GMT",
    "product_id": "default_product_id",
    "original_purchase_date_pst": "2023-06-06 06:06:06 America/Los_Angeles",
    "in_app_ownership_type": "PURCHASED",
    "subscription_group_identifier": "20877951",
    "original_purchase_date_ms": "1686002766000",
    "web_order_line_item_id": "666666666666666",
    "expires_date_ms": "4092595200000",
    "purchase_date_pst": "2023-06-06 06:06:06 America/Los_Angeles",
    "original_purchase_date": "2023-06-06 06:06:06 Etc/GMT"
  };

  var renewal = {
    "expiration_intent": "1",
    "product_id": "default_product_id",
    "is_in_billing_retry_period": "0",
    "auto_renew_product_id": "default_product_id",
    "original_transaction_id": "666666666666666",
    "auto_renew_status": "0"
  };

  // 遍历 uaProductMapping，匹配 User-Agent
  for (var uaKey in uaProductMapping) {
    if (UA && UA.includes(uaKey)) {
      var productInfo = uaProductMapping[uaKey];
      var product_id = productInfo.product_id;
      // 跳过无效占位符
      if (product_id === 'https://t.me/Guding88') continue;
      receipt.product_id = product_id;
      renewal.product_id = product_id;
      renewal.auto_renew_product_id = product_id;
      guding.receipt = guding.receipt || {};
      guding.receipt.in_app = [receipt];
      guding.latest_receipt_info = [receipt];
      guding.pending_renewal_info = [renewal];
      break;
    }
  }

  // 返回最终响应
  $done({ body: JSON.stringify(guding) });

} catch (e) {
  console.log('Error in Fused_iTunes.js: ' + e.message);
  $done({ body: $response.body }); // 出错时返回原始响应
}
