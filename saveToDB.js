const newsCollection = require('./database.js');
const moment = require('moment');

const save = async function(newsObject) {
    const news = new newsCollection({
        date: moment(new Date()).format("DD/MM/YYYY"),
        link: newsObject.link,
        heading: newsObject.heading,
        article: newsObject.article,
        imageUrl: newsObject.imageUrl
    });

    await news.save().then(() => {
        console.log('saved successfully reuters');
    }).catch((error) => {
        console.log('error in saving');
    });
}

module.exports = save;