const Survey = require('../models/survey_model');

exports.new = (req, res) => {
    res.render('survey/new', {title: 'Créer un nouveau sondage'});
};