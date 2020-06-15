const express = require('express')
const newsCollection = require('./database.js');
const manoramaCollection = require('./databaseConnectionForManorama.js');
const bodyParser = require('body-parser');
const reuter = require('./reuters.js');
const manorama = require('./manorama.js');
const opn = require('better-opn');
const moment = require('moment');
const reuters = require('./reuters.js');
const app = express()
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.listen(port, () => console.log(`server is up and listening at http://localhost:${port}`))

//opn('http://localhost:3000/reuters')
//opn('http://localhost:3000/manorama')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CROS Error//
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://vaarthaa.herokuapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (resq,res) => {
    manoramaCollection.find({date: moment(new Date()).format("DD/MM/YYYY")}).sort({_id: -1})
    .then((resp) => {
        res.render('index', {news: resp});
    })
    .catch((error) => {
        console.log('error to get the home page');
    });

});

app.get('/reuters', (req, res) => {
    newsCollection.find({date: moment(new Date()).format("DD/MM/YYYY")}).sort({ _id: -1 })
    .then((resp) => {
        console.log('reuters',resp.length);
        res.render('news', {title: 'Reuters', news: resp});
    })
    .catch((error) => {
        console.log('error to get the reuters page');
    });
})

app.get('/manorama', (req,res) => {
    manoramaCollection.find({date: moment(new Date()).format("DD/MM/YYYY")}).sort({_id: -1})
    .then((resp) => {
        console.log('reuters',resp.length);
       res.render('news', {title: 'Manorama', news: resp}); 
    })
    .catch((error) => {
        console.log('error to get the manorama page');
    });
})

app.get('/news/reuters', (req, res) => {
    newsCollection.find({date: moment(new Date()).format("DD/MM/YYYY")}).sort({ _id: -1 })
    .then((resp) => {
        console.log(resp.length);
        res.status(200).send(resp);
    })
    .catch((error) => {
        res.status(400).send(error);
    });
})

app.get('/news/manorama', (req,res) => {
    manoramaCollection.find({date: moment(new Date()).format("DD/MM/YYYY")}).sort({_id: -1})
    .then((resp) => {
        console.log(resp.length);
        res.status(200).send(resp);
    })
    .catch((error) => {
        res.status(400).send(error);
    });
});

var articleReuters;
var articleManorama;

// newsCollection.find({date: moment(new Date()).format("DD/MM/YYYY")}).sort({ _id: -1 })
//     .then((resp) => {
//         console.log('reuters article',resp.length);
//         if(resp) {
//             articleReuters = resp;
//         }
//     })
//     .catch((error) => {
//         console.log('error to get the reuters page');
//     });

// manoramaCollection.find({date: moment(new Date()).format("DD/MM/YYYY")}).sort({_id: -1})
//     .then((resp) => {
//         console.log('manorama article',resp.length);
//         if(resp) {
//             articleManorama = resp;
//         }
//     })
//     .catch((error) => {
//         console.log('error to get the manorama page');
//     });

async function articleRun1() {
    newsCollection.find({date: moment(new Date()).format("DD/MM/YYYY")}).sort({ _id: -1 })
    .then((resp) => {
        console.log('reuters article',resp.length);
        if(resp) {
            articleReuters = resp;
        }
    })
    .catch((error) => {
        console.log('error to get the reuters page');
    });
}
async function articleRun2() {
    manoramaCollection.find({date: moment(new Date()).format("DD/MM/YYYY")}).sort({_id: -1})
    .then((resp) => {
        console.log('manorama article',resp.length);
        if(resp) {
            articleManorama = resp;
        }
    })
    .catch((error) => {
        console.log('error to get the manorama page');
    });
}


async function articleRefresh() {
    await articleRun1();
    await articleRun2();
}

articleRefresh();

app.get('/article', (req,res) => {
    articleRefresh();
    res.render('articles', {reuter: articleReuters, manorama: articleManorama});
});

app.get('/article/:collectionId/:articleId', (req,res) => {
    if (req.params.collectionId == 1) {
        newsCollection.find({_id: req.params.articleId})
        .then(resp => {
            res.render('details', {res: resp});
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching News Failed!'
            });
        });
    } else if (req.params.collectionId == 2) {
        manoramaCollection.find({_id: req.params.articleId})
        .then(resp => {
            res.render('details', {res: resp});
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching News Failed!'
            });
        });
    }
});