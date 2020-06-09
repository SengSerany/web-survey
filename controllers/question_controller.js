const Question = require('../models/question_model');
const Survey = require('../models/survey_model');
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

exports.create = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let survey = await Survey.findById(req.params.id);
        let newQuestion = await new Question();
        let questions = await Question.find({survey: survey._id}).populate('surveys');
        return res.render('survey/show', {survey: survey, questions: questions, newQuestion: newQuestion, errors: errors.array()});
    }
    try{
        let createdQuestion = await Question.create({
            question: req.body.question,
            survey: req.body.survey,
            answerType: req.body.answerType,
            answerNumber: req.body.answerNumber,
            answerName: req.body.answerName
        });
        let newQuestion = await new Question();
        let questions = await Question.find({survey: survey._id}).populate('surveys');
        res.render('survey/show', {survey: survey, questions: questions, newQuestion: newQuestion });
    } catch (e){
        res.json(e);
    }
}
exports.delete = async (req, res) => {
    try {
        let taj = await Question.findByIdAndDelete(req.params.id);
    } catch (err) {
        return res.status(500).send(err);
    }
    res.json();
};