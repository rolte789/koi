const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';
const C_CN = '250,213,149';

function handler() {
  const content = fetch('https://www.youtube.com/premium', {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      'accept':
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'en',
      'upgrade-insecure-requests': '1',
      'cookies': {
        'YSC': 'BiCUU3-5Gdk',
        'CONSENT': 'YES+cb.20220301-11-p0.en+FX+700',
        'GPS': '1',
        'VISITOR_INFO1_LIVE': '4VwPMkB7W5A',
        '_gcl_au': '1.1.1809531354.1646633279',
        'PREF': 'tz=Asia.Shanghai',
      },
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
    const body = content.body;

    if (/www.google.cn/.test(body)) {
      return {
        text: `送中(CN)`,
        background: C_CN,
      };
    }

    if (/Premium is not available in your country/.test(body)) {
      return {
        text: '未知',
        background: C_UNK,
      };
    }

    let region = '未知';
    if (/"countryCode":"(.*?)"/.test(body)) {
      region = body.match(/"countryCode":"(.*?)"/)[1];
      return {
        text: `解锁(${region.toUpperCase()})`,
        background: C_UNL,
      };
    }
    if (
      /YouTube and YouTube Music ad-free, offline, and in the background/.test(
        body
      )
    ) {
      return {
        text: `解锁(US)`,
        background: C_UNL,
      };
    }
    return {
      text: `解锁(${region.toUpperCase()})`,
      background: C_UNK,
    };
  } else if (content.statusCode == 302) {
    return {
      text: `重定向`,
      background: C_UNL,
    };
  } else {
    return {
      text: '未知',
      background: C_UNK,
    };
  }
}
