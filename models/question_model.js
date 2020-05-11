const mongoose = require('mongoose');

let QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        require: true
    },
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Survey",
        require: true
    },
    answerType: {
        type: String,
        require: true
    },
    answerNumber: {
        type: Number,
        default: 1
    },
    answerName: [{
        name: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date
    }
});

let Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;