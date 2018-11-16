var express = require('express');
var router = express.Router();
var controller = require('../controller/admin');

router.get('/',controller.dashboard);
router.post('/register',controller.register);
router.get('/clients',controller.get_clients);
router.get('/manage/clients',controller.manage_client);
module.exports = router;