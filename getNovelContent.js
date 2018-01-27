const rp = require('request-promise');
const cheerio = require('cheerio');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const fs = require('fs');

const agent = require('./UserAgent/htmlAgent');

let concurrencyCount = 0;
let n = 0;
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
    try {
        // 异步写入
        fs.writeFile(
            `./doc/${name}/${strs}.txt`,
            chapterName,
            err => err ? console.log('文件写入出错了' + name + strs + err) : console.log(n++, '写入： ' + name + ' ' + strs))
        // true
    } catch (err) {
        err => console.log(name + '文件写入出错了' + err)
    }
}

// 多次尝试请求
const rqTimes = async url => {
    let res = '';
    for (let i = 0; i < 5; ++i) {
        try {
            res = await rp(url);
            break;
        } catch (err) {console.log(err)}
    }
    return res;
}

// str，小说章节对应的字符串，name，小说的名字，（文件夹名字）
const getNovelContent = async (str, name) => {
    let qs = {bookId: ''};
    let url = chapterLink + str;
    let agt = agent(url, qs);
    let res = await rqTimes(agt);
    
    // let res = await rqTimes(url)
    // 异步处理文件写入
    handleContent(res, name)
        .catch(err => console.log(name, err));
}

module.exports = getNovelContent;