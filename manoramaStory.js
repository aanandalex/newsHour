const axios = require('axios');
const moment = require('moment');
const cheerio = require('cheerio');
const checkInDataBase = require('./checkInDb.js');

const manoramaStory = function(link) {
    axios.get(link)
    .then((response) => {
        if (response.status == 200) {
            const $ = cheerio.load(response.data);
            const article = [];
            $('div.article.rte-article > p').each((i,el) => {
                article[i] = $(el).text();
            });
            images = [];
            $('img').each((j,li) => {
                if ($(li).attr('src') != "https://img-mm.manoramaonline.com/etc/designs/mmonline/clientlibs/img/mmo-default-img.gif") {
                    images.push($(li).attr('src'));
                }
            })

            const newsBody = {
                "link": link,
                "heading": $('.story-headline').text(),
                "article": article,
                "imageUrl": images
            };
            checkInDataBase(newsBody);
        }
    })
    .catch((error) => {
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
module.exports = manoramaStory;