const express = require('express');
const router = express.Router();

const authentification_controller = require('../controllers/authentification_controller');

router.get('/logIn', authentification_controller.logIn);
router.get('/signIn', authentification_controller.signIn);
router.post('/logIn', authentification_controller.connect);
router.post('/signIn', authentification_controller.register);
router.get('/logout', authentification_controller.logout);
router.get('/success', authentification_controller.success);
router.get('/failed', authentification_controller.failed);

module.exports = router;