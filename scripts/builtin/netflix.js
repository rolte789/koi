const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

function handler() {
  const content = fetch('https://www.netflix.com/title/80113701', {
    headers: {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'zh-CN,zh;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
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
    let index1 = content.body.indexOf('preferredLocale')
    let region = content.body.substring(index1 + 29, index1 + 31);
    return index1 > 0 ? {text: "解锁(" + region + ")",background: C_UNL} : {text: "未知",background: C_FAIL}
  } else {
        return {
            text: '失败',
            background: C_UNK,
        };
    }
}
