const Survey = require('../models/survey_model');
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

exports.new = async (req, res) => {
    try {
        let survey = await new Survey();
        res.render('survey/new', {survey: survey});
    } catch (err) {
        return res.redirect('/',{errors: err.array()});
    }
};

exports.show = async (req, res) => {
    try {
        let survey = await Survey.findById(req.params.id);
        res.render('/show', {survey: survey, title: survey.name})
    } catch (err) {
        let survey = await new Survey();
        return res.render('survey/new', {survey: survey})
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
            description: req.body.description.replace(/<[^>]*>?/gm,""),
            createdAt: Date.now(),
            updateAt: Date.now()
        });
        res.render('survey/show', {survey: newSurvey, title: newSurvey.name});
    } catch (err) {
        return res.status(500).send(err);
    }
};
