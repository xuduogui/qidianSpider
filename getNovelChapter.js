const rp = require('request-promise');
const agent = require('./UserAgent/randomAgent');
const delaySend = require('./UserAgent/delaySend')

let num = 0;
// 返回数据处理方式, 同步， 获取小说列表
const handleMsg = async (arr, name, handle) => {
    // 利用对象去重
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].cs.length; j++) {
            if (!obj[arr[i].cs[j].cU]) {
                await handle(arr[i].cs[j].cU, name)
                    .catch(err => console.log(err));
                obj[arr[i].cs[j].cU] = 1;
            }
            
        }
    }
}
// 返回数据处理方式, 异步
// const handleMsg = async (arr, name, handle) => {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr[i].cs.length; j++) {
//             handle(arr[i].cs[j].cU, name)
//                 .catch(err => console.log(name + '获取小说内容出错' + err))
//         }
//     }
// }



// 数组去重
// const unique = arr => Array.from(new Set(arr));
// 数组去重
function unique(arr) {
    var res = [];
    var json = {};
    for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
}

// 小说章节列表数据请求拼接 uri
const getListUri = 'https://book.qidian.com/ajax/book/category';
// const getListQs = '?_csrfToken=t8bt79GaW5c3BJbsQ5mqEG3BjpgusdcJw93fYdfh&bookId=';

// 获取某部小说的列表,id,小说id，name，小说名字，handle，回调函数, 同步方法
const getNovelChapter = async (id, name, handle) => {
    let qs = {
        "_csrfToken": 't8bt79GaW5c3BJbsQ5mqEG3BjpgusdcJw93fYdfh',
        "bookId": id       // -> uri + '?access_token=xxxxx%20xxxxx'
    }
    
    let agt = agent(getListUri, qs)
    let res = await rp(agt);
    let arr = res.data.vs;
    console.log()
    await handleMsg(arr, name, handle)
        .catch(err => console.log(err))
    await console.log(name + ' 小说写入全部完成');
}


// 异步方法
// const getNovelChapter = (id, name, handle) => {
//     let agt = agent(getListUri, id)
//     // let res = await rp(agt);
//     delaySend(agt, name, handleMsg, handle)
//     // let arr = res.data.vs;
//     // await handleMsg(arr, name, handle)
//     //     .catch(err => console.log(err))
//     // await console.log(name + ' 小说写入全部完成');
// }






module.exports = getNovelChapter;