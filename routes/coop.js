var express = require('express');
var router = express.Router();
var controller = require('../controller/coop');

router.get('/manage/members',controller.members_management);
router.get('/members',controller.members);
router.get('/register',controller.reg_page);
router.post('/register',controller.register);
router.post('/rec_trans',controller.record_trans);
module.exports = router;