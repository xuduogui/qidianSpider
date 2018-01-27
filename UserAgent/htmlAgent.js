const randomUserAgent = require('./agentHead');

// const getListQs = '?_csrfToken=t8bt79GaW5c3BJbsQ5mqEG3BjpgusdcJw93fYdfh&bookId=';
const agent = (url) => {
    // console.log(url, qs)
    let options = {
        'method': 'get',
        'uri': url,
        // 'qs': {
        //     "_csrfToken": 't8bt79GaW5c3BJbsQ5mqEG3BjpgusdcJw93fYdfh',
        //     "bookId": id       // -> uri + '?access_token=xxxxx%20xxxxx'
        // },
        'headers': {
            // Accept: "*/*",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Connection": "keep-alive",
            // "Content-Type": "application/x-www-form-urlencoded",
            // "Referer": `https://book.qidian.com/info/${qs.bookId}`,
            // Host: "music.163.com",
            "Accept-Encoding": "gzip, deflate, br",
            // Cookie: cookie,
            "User-Agent": randomUserAgent()
        },
        // 'json': true // Automatically parses the JSON string in the response
    };
    return options;
}


module.exports = agent;