const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SurveySchema = new Schema({
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
        default: Date.now,
        required: true
    },
    updateAt: {
        type: Date
    }
});

let Survey = mongoose.model('Survey', SurveySchema);
module.exports = Survey;