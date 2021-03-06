const newsCollection = require('./database.js');
const save = require('./saveToDB.js');

const check = async function(newsBody) {
    await newsCollection.find({link: newsBody.link})
    .then((resp) => {
        if (resp.length == 1) {
            console.log('link already exsists reuters');
        } else {
            console.log('not in the database');
            save(newsBody);
        }
    })
    .catch((error) => {
        console.log('error to store news in reuters');
    })
}

module.exports = check;