const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/user');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view.engine', 'ejs');
app.use(express.static('public'))


mongoose.connect("mongodb://127.0.0.1:27017/simuBank", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const store = new mongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/simuBank',
    collection: 'sessions'
})

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    store: store
}))

// index page
app.get('/', (req, res) => {
    res.render('index.ejs')
})


// register page
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', (req, res) => {
    const { firstName, lastName, email, password1, password2 } = req.body;
    // if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
    //     res.send("Please enter all fields")
    //     return;
    // }
    if (email.indexOf('@') == -1) {
        res.send("Please enter a valid email")
        return;
    }
    // if (password.length < 6) {
    //     res.send("Password must be at least 6 characters")
    //     return;
    // }
    if (password1 != password2) {
        res.send("Passwords do not match")
        return;
    }
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
})

// login page
app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    //FIXME: add validation
    // if (!email.trim() || !password.trim()) {
    //     res.send("Please enter all fields")
    //     return;
    // }
    // if (email.indexOf('@') == -1) {
    //     res.send("Please enter a valid email")
    //     return;
    // }
    // if (password.length < 6) {
    //     res.send("Password must be at least 6 characters")
    //     return;
    // }

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
})
// account page 
app.get('/account', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    const user = req.session.user;
    console.log(user);
    res.render('account.ejs', { user: user })

})

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.logoutRoute = '/logout';
    next();
})

app.listen(3000)