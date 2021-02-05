const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
// On récupère toutes les routes des users
const userRoutes = require('./routes/user.routes')
const smsRoutes = require('./routes/sms.routes')
const contactRoutes = require('./routes/contact.routes')
const destinationRoutes = require('./routes/destination.routes')

const app = express();
require('./passport/passport-config')

// middleware de gestion de CORS, ...
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//prise en compte du body des requetes
app.use(bodyParser.json());

// app.use('/api', passport.authenticate('jwt',{session: false}))

// using routes of users as middleware
app.use('/api/users', userRoutes);

//using routes of sms as middleware
app.use('/api/sms', smsRoutes);

//using routes of contact as middleware
app.use('/api/contacts', contactRoutes);

//using routes of destination as middleware
app.use('/api/destinations', destinationRoutes);

app.use('/test/', (req, res,) => {
    res.json({message: "success"});
});


module.exports = app;
