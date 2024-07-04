/*
 # @Author: Telegram @FullTclash
 # @Date: 2023-03-06
 # @Telegram: https://t.me/FullTclash
 # Copyright © 2023 by FullTclash, All Rights Reserved. 
 # 允许重写、转载、重新分发此脚本乃至商用。要求保留此原作者信息。
*/

const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

function handler() {
  const content = fetch('https://www.tiktok.com', {
    headers: {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en",
    "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
    },
    noRedir: false,
    retry: 3,
    timeout: 5000,
  });

  if (!content) {
    return {
      text: 'N/A',
      background: C_NA,
    };
  } else if (content.statusCode == 200) {
    let region_index = content.body.indexOf('"region":');
    if (region_index > 0) {
    region = content.body.slice(region_index).split('"')[3];
    // console.log("Tiktok Region: ", region);
    return {
        text: `解锁(${region})`,
        background: C_UNL,
    };
    } else {
    // console.log("Tiktok Region: Not found");
    return {
        text: '失败',
        background: C_FAIL,
    };
    }
  } else {
    return {
      text: '未知',
      background: C_UNK,
    };
  }
}
