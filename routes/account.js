const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    const user = req.session.user;
    res.render('account.ejs', { user: user })
})


router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;