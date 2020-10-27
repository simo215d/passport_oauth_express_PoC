var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/google', function(req, res, next) {
    res.send('you using google as login1');
});

module.exports = router;
