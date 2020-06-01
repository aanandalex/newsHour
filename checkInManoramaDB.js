const manoramaCollection = require('./databaseConnectionForManorama.js');
const save = require('./saveToManoramaDB.js');

const check = async function(newsBody) {
    await manoramaCollection.find({link: newsBody.link})
    .then((resp) => {
        if (resp.length == 1) {
            console.log('link already exsists manorama');
        } else {
            console.log('not in the database');
            save(newsBody);
        }
    })
    .catch((error) => {
        console.log('error to store news manorama');
    })
}

module.exports = check;