const express = require('express');
const router = express.Router();

const authentification_controller = require('../controllers/authentification_controller');

router.get('/logIn', authentification_controller.logIn);
router.get('/signIn', authentification_controller.signIn);
router.post('/logIn', authentification_controller.connect);
router.post('/signIn', authentification_controller.register);


module.exports = router;