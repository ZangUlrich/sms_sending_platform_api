const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

// On récupère toutes les routes des users
const userRoutes = require('./routes/user.routes')
const smsRoutes = require('./routes/sms.routes')
const contactRoutes = require('./routes/contact.routes')
const destinationRoutes = require('./routes/destination.routes')
const fileUploadRoutes = require('./routes/fileUpload.routes')

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

// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 5 * 1024 * 1024 * 1024 //5MB max file(s) size
    }
}));

//add other middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(express.static('uploads/images'));

// app.use('/api', passport.authenticate('jwt',{session: false}))

// using routes of users as middleware
app.use('/api/users', userRoutes);

//using routes of sms as middleware
app.use('/api/sms', smsRoutes);

//using routes of contact as middleware
app.use('/api/contacts', contactRoutes);

//using routes of destination as middleware
app.use('/api/destinations', destinationRoutes);

//using routes of file upload as middleware
app.use('/api/fileUpload', fileUploadRoutes);

app.use('/test/', (req, res,) => {
    res.json({message: "success"});
});


module.exports = app;
