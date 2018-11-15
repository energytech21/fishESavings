var express = require('express');
var router = express.Router();
var controller = require('../controller/OAuth');

router.get('/',controller.get_link);
router.get('/redirect',controller.redirect);


module.exports = router;