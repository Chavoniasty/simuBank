const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.get('/', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    let user = req.session.user;
    res.render('account.ejs', { user: user })
})

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

router.patch('/transfer', async (req, res) => {
    try {
        const { destinationAccount, amount } = req.body;
        const loggedUser = await user.findOne({ email: req.session.user.email });
        if (!loggedUser) {
            res.redirect('/login');
            return;
        }
        const destination = await user.findOne({ email: destinationAccount });
        if (!destination) {
            return res.send({ status: 'error', message: 'Invalid destination account' });
        }

        //DO NOT DELETE THIS LINE
        const transferAmount = parseFloat(amount);

        if (loggedUser.balance >= transferAmount && transferAmount > 0) {
            loggedUser.balance -= transferAmount;
            destination.balance += transferAmount;

            await loggedUser.save();
            await destination.save();
        }
    }
    catch (error) {
        console.log(error);
    }
});

module.exports = router;