const rp = require('request-promise');


// 并发控制
let curNum = 0;
let ctrCur = async url => {
    curNum++;
    while (true) {
        if (curNum < 10) {
            curNum--
            return await rp(url)
                .catch(err => console.log(err))
        }
    }
}

module.exports = ctrCur;