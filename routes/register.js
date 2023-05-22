const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { registerFormValidation } = require('../utils/registerFormValidation');

router.get('/', (req, res) => {
    res.render('register.ejs')
})

router.post('/', (req, res) => {
    const { firstName, lastName, email, password1, password2 } = req.body;
    const validationError = registerFormValidation(firstName, lastName, email, password1, password2);
    if (!validationError) {
        try {
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: password1
            })
            newUser.save();
            res.redirect('/login');

        } catch (err) {
            console.log(err);
        }
    }
    else {
        res.send(validationError);
    }
})

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

module.exports = router;
