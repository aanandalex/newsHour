const manoramaCollection = require('./databaseConnectionForManorama.js');
const moment = require('moment');

const save = async function(newsObject) {
    const news = new manoramaCollection({
        date: moment(new Date()).format("DD/MM/YYYY"),
        link: newsObject.link,
        heading: newsObject.heading,
        article: newsObject.article,
        imageUrl: newsObject.imageUrl
    });

    await news.save().then(() => {
        console.log('saved successfully ' + newsObject.heading);
    }).catch((error) => {
        console.log('error in saving', error);
    });
}

module.exports = save;