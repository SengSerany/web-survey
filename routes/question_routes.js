const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { ensureAuthenticated } = require("../config/auth")
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

const question_controller = require('../controllers/question_controller');

router.post('/:id', ensureAuthenticated, urlencodedParser, question_controller.create);

router.delete('/delete/:id', ensureAuthenticated, urlencodedParser, question_controller.delete);

module.exports = router;