const axios = require('axios');
var moment = require('moment');
const cheerio = require('cheerio');
const story = require('./reutersLink.js');

const reuters = async function() {
  console.log('updated at ' + moment(new Date()).format('hh:mm A'));
  await axios.get('https://in.reuters.com/news/top-news')
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
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        console.log('error to fill the links in array!');
    }
  })
  .catch(function (error) {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log("Error in getting request!");
      } else {
        console.log('Error to get reuters site!');
      }
      console.log(error.config);
  });
}

  setInterval(() => {
    reuters();
  }, 120000);

  module.exports = reuters;