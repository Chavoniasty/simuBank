const express = require('express');
const router = express.Router();
const showSlides = require('../utils/slider.js');

router.get('/', (req, res) => {
    res.render('index.ejs')
})

router.get('/register', (req, res) => {
    res.render('register.ejs');
});

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;