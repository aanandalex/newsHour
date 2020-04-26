const express = require('express')
const newsCollection = require('./database.js');
const manoramaCollection = require('./databaseConnectionForManorama.js');
const reuter = require('./reuters.js');
const manorama = require('./manorama.js');
const opn = require('better-opn');
const moment = require('moment');
const speech = require('./textToSpeech.js');
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.listen(port, () => console.log(`server is up and listening at http://localhost:${port}`))

opn('http://localhost:3000/reuters')
opn('http://localhost:3000/manorama')

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

app.get('/manorama', (req,res) => {
    manoramaCollection.find({date: moment(new Date()).format("DD/MM/YYYY")}).sort({_id: -1})
    .then((resp) => {
        console.log(resp.length);
        res.render('manorama', {title: 'Manorama', news: resp});
    })
    .catch((error) => {
        console.log(error);
    });
})