const getNovelChapter = require('./getNovelChapter');
const getNovelContent = require('./getNovelContent');
const getNovelID = require('./getNoveID');

const rootCtr = require('./UserAgent/rootCtrCur');

let n = 0;
let pageNum = 1;
const test = async () => {
    let curNum = 0;
    while (curNum < 4) {
        curNum++;
        pageNum++;
        getNovelID(pageNum)
            .then(res => {
                console.log(`第${i}页，加载结束`);
                curNum--;
                test();
            })
            .catch(err => {
                console.log(err + `第${ pageNum }页，出错`);
                curNum--;
            })
        return;
    }
}

test().catch(err => console.log(err))