const axios = require('axios');
var moment = require('moment');
const cheerio = require('cheerio');
const manoramaStory = require('./manoramaStory.js');

var storyLinks = [];

const manorama = function () {
    console.log('updated at ' + moment(new Date()).format('hh:mm A'));
    axios.get('https://www.manoramaonline.com/news/latest-news.html')
    .then(function (response) {
        console.log('Manorama ' +response.status);
        if (response.status == 200) {
            const $ = cheerio.load(response.data);
            const links = [];
            $('.articleList a').each((i,li) => {
                links[i] = $(li).attr('href');
            });
            storyLinks = Array.from(new Set(links));
        } else {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        }
    })
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
}

setInterval(() => {
    manorama();
    setTimeout(() => {
        for (var i = 0; i< storyLinks.length; i++) {
            manoramaStory(storyLinks[i]);
        }
    }, 2000);
}, 60000);

module.exports = manorama;