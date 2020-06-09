const Survey = require('../models/survey_model');
const Question = require('../models/question_model');
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');


exports.index = async (req, res) => {
    try {
        let surveys = await Survey.find({});
        res.render('survey/index', {surveys: surveys});
    } catch (err) {
        return res.status(500).send(err);
    }
}

exports.show = async (req, res) => {
    try {
        let survey = await Survey.findById(req.params.id);
        let newQuestion = await new Question();
        let questions = await Question.find({survey: survey._id}).populate('surveys');
        res.render('survey/show', {survey: survey, newQuestion: newQuestion, questions: questions})
    } catch (err) {
        return res.status(500).send(err);
    }
};

exports.new = async (req, res) => {
    try {
        let survey = await new Survey();
        res.render('survey/new', {survey: survey});
    } catch (err) {
        return res.status(500).send(err);
    }
};

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let survey = await new Survey();
        return res.render('survey/new', {survey: survey, errors: errors.array()});
    }
    try {
        let newSurvey = await Survey.create({
            name: req.body.name.replace(/<[^>]*>?/gm,""),
            description: unescape(req.body.description.replace(/<[^>]*>?/gm,""))
        });
        let surveys = await Survey.find({});
        res.render('survey/index', {surveys: surveys});
    } catch (err) {
        return res.status(500).send(err);
    }
};

exports.edit = async (req, res) => {
    try {
        let survey = await Survey.findById(req.params.id);
        res.render('survey/edit', {survey: survey });
    } catch (err) {
        return res.status(500).send(err);
    }
}

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let survey = await Survey.findById(req.params.id);
        return res.render('survey/edit', {survey: survey, errors: errors.array()});
    }
    try {
        let survey = await Survey.findByIdAndUpdate(req.params.id, {
            name: req.body.name.replace(/<[^>]*>?/gm,""),
            description: req.body.description.replace(/<[^>]*>?/gm,""),
            updateAt: Date.now()
        }, { new: true, upsert: true });
        let questions = await Question.find({survey: survey._id}).populate('surveys');
        let newQuestion = await new Question();
        res.render('survey/show', {survey: survey, questions: questions, newQuestion: newQuestion});
    } catch (err) {
        return res.status(500).send(err);
    }
}

exports.delete = async (req, res) => {
    try {
        await Survey.findByIdAndDelete(req.params.id);
        await Question.deleteMany({survey: req.params.id});
        res.redirect('/survey/index');
    } catch (error) {
        return res.status(500).send(err);
    }
}