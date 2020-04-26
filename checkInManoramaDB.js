const manoramaCollection = require('./databaseConnectionForManorama.js');
const save = require('./saveToManoramaDB.js');

const check = function(newsBody) {
    manoramaCollection.find({link: newsBody.link})
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