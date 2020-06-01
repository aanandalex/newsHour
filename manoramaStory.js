const axios = require('axios');
const moment = require('moment');
const cheerio = require('cheerio');
const checkInManoramaDB = require('./checkInManoramaDB');

const manoramaStory = async function(link) {
    await axios.get(link)
    .then((response) => {
        if (response.status == 200) {
            const $ = cheerio.load(response.data);
            const article = [];
            $('div.article.rte-article > p').each((i,el) => {
                article[i] = $(el).text();
            });
            images = [];
            $('div.story-figure-image img').each((j,li) => {
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
            checkInManoramaDB(newsBody);
        }
    })
    .catch((error) => {
        if (error.response) {
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            console.log('error to get news from manorama story link');
          } else if (error.request) {
            //console.log(error.request);
            console.log('error to get request from manorama story');
          } else {
            // console.log('Error', error.message);
            console.log('error to get manorama story');
          }
          //console.log(error.config);
          console.log('error to get config manorama');
      });
}
module.exports = manoramaStory;