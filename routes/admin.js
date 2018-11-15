var express = require('express');
var router = express.Router();
var controller = require('../controller/admin');

router.get('/',controller.login);
router.post('/register',controller.register);

module.exports = router;