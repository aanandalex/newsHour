const express = require('express')
const newsCollection = require('./database.js');
const reuter = require('./reuters.js');
const opn = require('better-opn');
const moment = require('moment');
const app = express()
const port = 3000

app.set('view engine', 'ejs');

setInterval(() => {
    reuter
}, 1500000);

app.listen(port, () => console.log(`server is up and listening at http://localhost:${port}`))

opn('http://localhost:3000/reuters')

app.get('/reuters', (req, res) => {
    newsCollection.find({date: moment(new Date()).format("DD/MM/YYYY")}).sort({ _id: -1 })
    .then((resp) => {
        console.log(resp.length);
        res.render('news', {title: 'Reuters', news: resp});
    })
    .catch((error) => {
        console.log(error);
    });
})