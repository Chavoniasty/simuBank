const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.get('/', async (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    try {
        const loggedUser = await user.findOne({ email: req.session.user.email });

        res.render('account.ejs', { user: loggedUser });
    } catch (error) {
        console.log(error);
        // Handle the error appropriately
    }
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
        console.log(transferAmount)
        console.log(typeof transferAmount)

        if (loggedUser.balance >= transferAmount && transferAmount > 0) {
            loggedUser.balance -= transferAmount;
            destination.balance += transferAmount;

            await loggedUser.save();
            await destination.save();

            const updatedUser = await user.findOne({ email: req.session.user.email });

            res.render('account.ejs', { user: updatedUser });

            // Reload the page after a short delay

        }
    }
    catch (error) {
        console.log(error);
    }
});

module.exports = router;