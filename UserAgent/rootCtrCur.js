const getNovelID = require('../getNoveID');
// 控制并发
let rootCur = 0;
let ctrRot = async (i) => {
    rootCur++;
    while (true) {
        if (rootCur < 3) {
            console.log(`发起----- 启动 ${rootCur} 条下载`)
            getNovelID(i)
                .then(res => {
                    rootCur--;
                    console.log(res, '结束50章下载')
                    console.log(`success:   ${rootCur}`)
                })
                .catch(err => console.log(err))
            return;
        }
    }
}

module.exports = ctrRot;