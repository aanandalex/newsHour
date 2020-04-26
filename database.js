const mongoose = require('mongoose');

mongoose.connect('mongodb://anand:unicornb1331@cluster0-shard-00-00-0tquo.mongodb.net:27017,cluster0-shard-00-01-0tquo.mongodb.net:27017,cluster0-shard-00-02-0tquo.mongodb.net:27017/morningNews?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to DataBase");
})
.catch((error) => {
    console.log(error);
    console.log("Connection Failed!!!");
});

const newsSchema = mongoose.Schema({
    date: {
        type: String,
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    heading: {
        type: String
    },
    article: [{
        type: String
    }],
    imageUrl: {
        type: String
    }
})

var newsCollection = mongoose.model("reuters", newsSchema);

module.exports = newsCollection;