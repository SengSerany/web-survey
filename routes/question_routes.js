const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

const question_controller = require('../controllers/question_controller');

router.post('/:id', urlencodedParser, question_controller.create);

router.delete('/delete/:id', urlencodedParser, question_controller.delete);

module.exports = router;