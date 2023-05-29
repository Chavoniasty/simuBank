const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const renderNavbar = require('./views/components/navbar.js');
const renderFooter = require('./views/components/footer.js');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

// routes
const indexRoute = require('./routes/index');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const accountRoute = require('./routes/account');

app.use((req, res, next) => {
    res.locals.navbar = renderNavbar(req.session.user || null);
    res.locals.footer = renderFooter();
    next();
});


app.use('/', indexRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/account', accountRoute);


app.listen(3000)