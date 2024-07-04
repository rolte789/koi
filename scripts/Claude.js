const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';


function handler() {
    const content = fetch("https://claude.ai/login", {
        headers: {
            'User-Agent': 'Go-http-client/2.0',
        },
        noRedir: true,
        retry: 3,
        timeout: 5000,
    });
    if (!content) {
        return {
            text: 'N/A',
            background: C_NA,
        };
    }else if (content.statusCode==307){
        return {
            text: '失败',
            background: C_FAIL,
        };
    }else if(content.statusCode==200){
        return {
            text: '解锁',
            background: C_UNL,
        };
    }else {
        return {
            text: `未知${content.statusCode}`,
            background: C_UNK,
        };
    }
}


