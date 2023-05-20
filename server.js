const express = require('express');
const app = express();

app.set('view.engine', 'ejs');

app.use(express.static('public'))

// index page
app.get('/', (req, res) => {
    res.render('index.ejs')
})


// register page
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.use('/scripts/registration.js', (req, res, next) => {
    res.type('text/javascript');
    next();
});

// login page
app.get('/login', (req, res) => {
    res.render('login.ejs')
})


// account page 
app.get('/account', (req, res) => {
    res.render('account.ejs')
})


app.listen(4000)