const Question = require('../models/question_model');
const Survey = require('../models/survey_model');
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

exports.create = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let survey = await Survey.findById(req.params.id);
        let newQuestion = await new Question();
        let questions = await Question.find({}).populate('surveys');
        return res.render('survey/show', {survey: survey, questions: questions, newQuestion: newQuestion, errors: errors.array()});
    }
    try{
        let newQuestion = await Question.create({
            question: req.body.question,
            survey: req.body.surveyID,
            answerType: req.body.answerType,
            answerNumber: req.body.answerNumber,
            answerName: req.body.answerName
        });
        console.log(req.body.answerName);
        console.log(typeof(req.body.answerName[0]))
    } catch (e){
        res.json(e);
    }
        res.json();
};

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let survey = await Survey.findById(req.params.id);
        let newQuestion = await new Question();
        let questions = await Question.find({}).populate('surveys');
        return res.render('survey/show', {survey: survey, questions: questions, newQuestion: newQuestion, errors: errors.array()});
    }
    try {

    } catch (err) {
        return res.status(500).send(err);
    }
};

exports.delete = async (req, res) => {
    try {

    } catch (err) {
        return res.status(500).send(err);
    }
};