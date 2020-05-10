const express = require('express');
const router = express.Router();

const survey_controller = require('../controllers/survey_controller');

router.get('/new', survey_controller.new)

module.exports = router;