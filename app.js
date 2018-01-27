const getNovelChapter = require('./getNovelChapter');
const getNovelContent = require('./getNovelContent');
const getNovelID = require('./getNoveID');


// const fs = require('fs');

// getNovelContent('rJgN8tJ_cVdRGoWu-UQg7Q2/6jr-buLIUJSaGfXRMrUjdw2')

// getNovelChapter(1003354631, getNovelContent)


// getNovelContent('iHBVJ0Mlhkw1/7TJV73UYLSoex0RJOkJclQ2')

// if (!fs.existsSync(`./doc/许多鬼`)) {
//     fs.mkdirSync(`./doc/许多鬼`);
// }

// getNovelChapter(1003354631, '许多鬼', getNovelContent)
// getNovelID(num)
let n = 0;
const test = async () => {
    for (let i = 0; 1 < 2; i++) {
        await getNovelID(i)
            .catch(err => console.log(err + i))
        await console.log(n++ + "-------------------------------------");
    }
}

test().catch(err => console.log(err))


// getNovelID(0)
//     .catch(err => console.log(err));

// const rp = require('request-promise')

// const mymy = async () => {
//     try {
//         let ss = await rp('dddd')
//     } catch (error) {
        
//     }
    
//     await console.log(9999)
// }
// mymy()
//     .catch(err => console.log(err))

