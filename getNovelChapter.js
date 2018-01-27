const rp = require('request-promise');
const agent = require('./UserAgent/randomAgent');
const ctrCur = require('./UserAgent/numConcurrence');

// 返回数据处理方式, 同步， 获取小说列表
const handleMsg = async (arr, name, handle) => {
    // 利用对象去重
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].cs.length; j++) {
            if (!obj[arr[i].cs[j].cU]) {
                // 并发，根据内容标志字符串，获得小说章节内容
                await handle(arr[i].cs[j].cU, name)
                    .catch(err => console.log(err));
                obj[arr[i].cs[j].cU] = 1;
            }
        }
    }
}

// 小说章节列表数据请求拼接 uri
const getListUri = 'https://book.qidian.com/ajax/book/category';
// const getListQs = '?_csrfToken=t8bt79GaW5c3BJbsQ5mqEG3BjpgusdcJw93fYdfh&bookId=';

// 获取某部小说的章节,id,小说id，name，小说名字，handle，回调函数, 同步方法
const getNovelChapter = async (id, name, handle) => {
    let qs = {
        "_csrfToken": 't8bt79GaW5c3BJbsQ5mqEG3BjpgusdcJw93fYdfh',
        "bookId": id       // -> uri + '?access_token=xxxxx%20xxxxx'
    }
    let agt = agent(getListUri, qs)
    console.log('根据id获取小说', id,' 的章节列表', agt)
    let res = await ctrCur(agt);
    console.log('获取成功 ', id, ' 的章节，成功')
    let arr = res.data.vs;
    console.log()
    await handleMsg(arr, name, handle)
        .catch(err => console.log(err))
}


module.exports = getNovelChapter;