const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

const getNovelChapter = require('./getNovelChapter');
const getNovelContent = require('./getNovelContent');

// 封装rp请求，控制并发
const ctrCur = require('./UserAgent/numConcurrence')

// 尝试按照免费全部分类，深度拉取
const link = 'https://www.qidian.com/free/all?style=2&page=';


// 同步处理，回调函数处理前的数据准备，处理标识html节点，拿id和小说名
const handleCallBack = async (str, $) => {
    let id = $(str).attr('data-bid');
    let name = $(str).html();
    name = entities.decode(name);
    !fs.existsSync(`./doc/${name}`) ? fs.mkdirSync(`./doc/${name}`) : true;
    await getNovelChapter(id, name, getNovelContent)
        .catch(err => console.log(err))
}

//  同步，遍历数组（小说列表）处理回调函数，拿小说章节内容标识，html节点
const replaceEach = async (arr, $) => {
    for (let i = 0; i < arr.length; i++) {
        await handleCallBack(arr[i], $)
            .catch(err => console.log(err))
    }
}

// 获取id,输入页码e，获得小说列表页html，并处理
const getNovelID = async pageNum => {
    let url = link + pageNum;
    console.log('发起------ 获取免费小说列表：', url)
    let res = await ctrCur(url);
    console.log(`成功------ 获取免费小说列表  第${pageNum}页`);
    let $ = cheerio.load(res);
    let a = $('.rank-table-list .name');
    await replaceEach(a, $)
        .catch(err => console.log(err));
}


module.exports = getNovelID