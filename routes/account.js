const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    const user = req.session.user;
    console.log(user);
    res.render('account.ejs', { user: user })
})

module.exports = router;