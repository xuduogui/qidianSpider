const getNovelChapter = require('./getNovelChapter');
const getNovelContent = require('./getNovelContent');
const getNovelID = require('./getNoveID');

let n = 0;
const test = async () => {
    for (let i = 1; i < 20; i++) {
        getNovelID(i)
            .then(res => console.log(`第${i}页，加载结束`))
            .catch(err => console.log(err + `第${ i }页，出错`))
    }
}

test().catch(err => console.log(err))