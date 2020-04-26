const newsCollection = require('./database.js');
const save = require('./saveToDB.js');

const check = function(newsBody) {
    newsCollection.find({link: newsBody.link})
    .then((resp) => {
        if (resp.length == 1) {
            console.log('link already exsists');
        } else {
            console.log('not in the database');
            save(newsBody);
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

module.exports = check;