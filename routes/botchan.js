var express = require('express');
var router = express.Router();

// Home page route
router.get('/', function (req, res) {
    res.send('Botchan home page.');
})

router.get('/:page', function(req, res) {
    res.send(req.params.page);
})

module.exports = router;