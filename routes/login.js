const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { loginFormValidation } = require('../utils/loginFormValidation');

router.get('/', (req, res) => {
    res.render('login.ejs')
})

router.post('/', (req, res) => {
    const { email, password } = req.body;
    if (!loginFormValidation(email, password)) {
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    res.send("User does not exist")
                    return;
                }
                if (password != user.password) {
                    res.send("Password is incorrect");
                    return;
                }
                if (password == user.password) {
                    req.session.user = user;
                    res.redirect('/account');
                }
            })
    }
    else {
        res.send(loginFormValidation(email, password));
    }
})


module.exports = router;