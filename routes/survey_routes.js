const express = require('express');
const router = express.Router();
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

const survey_controller = require('../controllers/survey_controller');

router.get('/new', survey_controller.new);

router.get('/index', survey_controller.index);

router.post('/:id',[
    body('name')
                .trim()
                .escape(),
    body('description')
                .trim()
                .escape()
], survey_controller.create);

router.get('/:id', survey_controller.show);

module.exports = router;