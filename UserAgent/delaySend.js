const rp = require('request-promise');

// 并发连接数的计数器
let concurrencyCount = 0;
let fetchUrl = function (url, name, handle, callback) {
    // delay 的值在 2000 以内，是个随机的整数
    let delay = parseInt((Math.random() * 10000000) % 2000, 10);
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url.qs.bookId, '，耗时' + delay + '毫秒');
    setTimeout(() => {
        concurrencyCount--;
        rp(url)
            .then(res => {
                let arr = res.data.vs;
                handle(arr, name, callback)
                    .then(name + ' 小说写入全部完成')
                    .catch(err => console.log(err))
                // console.log(name + ' 小说写入全部完成');
            })
            .catch(err => console.log('获取失败：' + url.qs.bookId + err))
    }, delay);
};


module.exports = fetchUrl;