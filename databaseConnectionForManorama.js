const mongoose = require('mongoose');

const manoramaSchema = mongoose.Schema({
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
    imageUrl: [{
        type: String
    }]
})

var manoramaCollection = mongoose.model("manoramas", manoramaSchema);

module.exports = manoramaCollection;