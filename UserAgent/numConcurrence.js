const rp = require('request-promise');


// 控制并发请求量
let curNum = 0;
let ctrCur = async url => {
    curNum++;
    while (true) {
        if (curNum < 10) {
            let res = await rp(url);
            curNum--;
            return res;
        }
    }
}




module.exports = ctrCur;