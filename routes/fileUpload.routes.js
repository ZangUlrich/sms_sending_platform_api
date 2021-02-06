const express = require('express')
const router = express.Router()
const passport = require('passport')

const fileUploadController = require('../controllers/fileUpload.controller');

// authentication middleware
router.use( passport.authenticate('jwt',{session: false}));

// upload contact avatar
router.post('/contact/:id', fileUploadController.createContactAvatar);

// upload user avatar  
router.post('/user/:id', fileUploadController.createUserAvater);

module.exports = router
