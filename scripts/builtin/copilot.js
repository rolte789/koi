const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';
const C_WAIT = '252,212,148';

const bing_url = "https://www.bing.com/chat?toWww=1"
let UNSUPPORT_REGION = ["MY","CV", "CN", "CU", "SR", "TL", "IR", 'CI', 'KP', 'PS', 'RU', 'SH', 'SY']
function handler() {
    const content = fetch(bing_url, {
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
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
    }else if (content.redirected){

        for (let url of content.urlList) {
            if (url.includes("cn.bing.com")) {
                return {
                    text: '失败(CN)',
                    background: C_FAIL,
                };
            }
        }
    }else if (content.body.indexOf('b_wlcmPersLogo.copilot') > 0) {
        const match = content.body.match(/Region:"(\w\w)"/);
        var region = "";
        if (match) {
          region = `(${match[1]})`; 
        } 
        if (region == "WW"){
            region = ""
        }
        return UNSUPPORT_REGION.includes(region.toUpperCase())?{
            text: '失败'+region,
            background: C_FAIL,
        }:{
            text: '解锁' + region,
            background: C_UNL,
        }
    } else {
        return {
            text: '失败',
            background: C_FAIL,
        };
    }
}
