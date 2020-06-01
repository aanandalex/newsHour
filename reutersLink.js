const axios = require('axios');
const moment = require('moment');
const cheerio = require('cheerio');
const checkInDataBase = require('./checkInDb.js');

const reuterStory = async function(link) {
    await axios.get('https://in.reuters.com' + link)
    .then((response) => {
        if (response.status == 200) {
            const $ = cheerio.load(response.data);
            const article = [];
            $('.StandardArticleBody_body p').each((i,el) => {
                article[i] = $(el).text();
            });
            if ($('.LazyImage_container img').attr('src') == undefined) {
                image = null;
            } else {
                image = $('.LazyImage_container img').attr('src');
                image = image.substring(0, image.length - 3);
            }
            
                const newsBody = {
                    "link": link,
                    "heading": $('.ArticleHeader_headline').text(),
                    "article": article,
                    "imageUrl": image
                };
            checkInDataBase(newsBody);
        }
    })
    .catch((error) => {
        if (error.response) {
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            console.log('error to get data from the news link reuters')
          } else if (error.request) {
            //console.log(error.request);
            console.log('error to get requet');
          } else {
            //console.log('Error', error.message);
            console.log('error, error message');
          }
          //console.log(error.config);
          console.log('error config');
      });
}

module.exports = reuterStory;