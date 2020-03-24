var express = require('express');
var router = express.Router();

var botchan_controller = require('../controllers/botchanController')


// Home page route
router.get('/', botchan_controller.index);

router.get('/:page', botchan_controller.page);

module.exports = router;