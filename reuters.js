const axios = require('axios');
var moment = require('moment');
const cheerio = require('cheerio');
const story = require('./reutersLink.js');

const reuters = function() {
  console.log('updated at ' + moment(new Date()).format('hh:mm A'));
  axios.get('https://in.reuters.com/news/top-news')
  .then(function (response) {
      console.log('reuters ' +response.status);
    if (response.status == 200) {
        const $ = cheerio.load(response.data);
        const links = [];
        $('.news-headline-list a').each((i,li) => {
            links[i] = $(li).attr('href');
            story($(li).attr('href'));
        });
        storyLinks = Array.from(new Set(links));
        topStoriesLink = storyLinks;
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
    reuters();
  }, 300000);

  module.exports = reuters;