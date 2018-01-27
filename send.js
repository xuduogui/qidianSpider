const rp = require('request-promise');

const linkHead = 'https://www.qidian.com';

// 发送请求,获取数据
const getHtml = url => {
    return new Promise((resolve, reject) => {
        rp(url)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

// 根据解析的路径，获取内容（很多小说的列表）
// 根据列表，拿小说id
const getBooks = async (path) => {
    let url = linkHead + analyzePah(path);
    return await getHtml(url);
}

module.exports = getBooks;