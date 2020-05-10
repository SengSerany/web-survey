const mongoose = require('mongoose');

let SurveySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date
    }
});

let Survey = mongoose.model('Survey', SurveySchema);
module.exports = Survey;