const C_NA = '142,140,142'; // 不可用时的背景颜色(灰色)
const C_UNL = '186,230,126'; // 解锁时的背景颜色(绿色)
const C_DJS = '255,177,102'; // 待解锁时的背景颜色(橙色)
const C_FAIL = '239,107,115'; // 检测失败时的背景颜色(红色)
const C_UNK = '92,207,230'; // 未知错误时的背景颜色(蓝色)


function handler() {
  const response = fetch('https://www.disneyplus.com/', {
    headers: {
      'Accept-Language': 'en',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
    },
    noRedir: false,
    retry: 3,
    timeout: 5000,
  });

  if (!response) {
    return {
      text: 'N/A',
      background: C_NA,
    };
  } else if (response.statusCode == 200) {
    if (response.body.indexOf('not available in your') !== -1) {
      // Disney+ 在此区域不可用
      return {
        text: '未解',
        background: C_NA,
      };
    }
    let regionMatch = response.body.match(/Region: ([A-Za-z]{2})/);
    let cnblMatch = response.body.match(/CNBL: ([12])/);
    if (regionMatch && cnblMatch) {
      let region = regionMatch[1];
      let cnbl = cnblMatch[1];
      // 根据CNBL的值判断是否即将开放服务
      if (cnbl === '2') {
        return { text: "解锁(" + region + ")", background: C_UNL };
      } else {
        return { text: "待解(" + region + ")", background: C_DJS };
      }
    } else {
      return { text: "未知", background: C_UNK };
    }
  } else {
    return {
      text: '失败',
      background: C_FAIL,
    };
  }
}