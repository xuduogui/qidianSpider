const rp = require('request-promise');
const cheerio = require('cheerio');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const fs = require('fs');

const agent = require('./UserAgent/htmlAgent');
const ctrCur = require('./UserAgent/numConcurrence')

// 计算成功写入的章节数目
let successNum = 0;
let errNum = 0;
// 获取小说章节内容的链接拼接
const chapterLink = 'https://read.qidian.com/chapter/';
// 处理返回值方法
const handleContent = async (res, name) => {
    let $ = cheerio.load(res);
    let a = $('.read-content p');
    let chapterName = $('.j_chapterName').html();
    chapterName = entities.decode(chapterName);
    let strs = chapterName.replace(/\s+/g, "");
    a.each(function () {
        chapterName += `\n${$(this).html()}`;
    })
    // 解析字符串
    chapterName = entities.decode(chapterName);
    // 异步写入
    fs.writeFile(
        `./doc/${name}/${strs}.txt`,
        chapterName,
        err => err ? console.log(errNum + '文件写入出错了' + name + strs + err) : console.log('写入 --- ', strs))
        // true
}

// 多次尝试请求
const rqTimes = async url => {
    let res = '';
    for (let i = 0; i < 5; ++i) {
        try {
            res = await ctrCur(url);
            break;
        } catch (err) {console.log(err)}
    }
    return res;
}

// str，小说章节对应的字符串，name，小说的名字，（文件夹名字）
const getNovelContent = async (str, name) => {
    let qs = {bookId: ''};
    let url = chapterLink + str;
    console.log('发起 --- 获取小说某一章的内容：', name, url)
    let agt = agent(url, qs);
    let res = await rqTimes(agt);
    console.log('成功 --- 获取某一章的内容： ', name, url)
    console.log('success: ', successNum++)
    // let res = await rqTimes(url)
    // 异步处理文件写入
    await handleContent(res, name)
        .catch(err => console.log(name, err));
}

module.exports = getNovelContent;