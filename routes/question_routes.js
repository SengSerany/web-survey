const express = require('express');
const router = express.Router();

const question_controller = require('../controllers/question_controller');

router.post('/:id', question_controller.create);

router.post('/edit/:id', question_controller.update);

router.get('/delete/:id', question_controller.delete);

module.exports = router;