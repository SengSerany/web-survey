const express = require('express');
const router = express.Router();
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

const { ensureAuthenticated } = require("../config/auth");
const survey_controller = require('../controllers/survey_controller');
const question_controller = require('../controllers/question_controller');

router.get('/new', ensureAuthenticated, survey_controller.new);

router.get('/index', ensureAuthenticated, survey_controller.index);

router.get('/edit/:id', ensureAuthenticated, survey_controller.edit);

router.post('/edit/:id', ensureAuthenticated,[
    body('name')
                .trim()
                .escape(),
    body('description')
                .trim()
                .escape()
], survey_controller.update);

router.get('/delete/:id', survey_controller.delete);

router.post('/:id', ensureAuthenticated,[
    body('name')
                .trim(),
    body('description')
                .trim()
], survey_controller.create);

router.get('/:id', ensureAuthenticated, survey_controller.show);


module.exports = router;