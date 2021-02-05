const express = require('express')
const router = express.Router()
const passport = require('passport');

const userController =   require('../controllers/user.controller');

// Retrieve all users
router.get('/', passport.authenticate('jwt',{session: false}),userController.findAll);
// Create a new user
router.post('/create', userController.create);
// Retrieve a single user with id
router.get('/:id', passport.authenticate('jwt',{session: false}), userController.findById);
// Update a user with id
router.put('/:id', passport.authenticate('jwt',{session: false}),userController.update);
// Delete a user with id
router.delete('/:id', passport.authenticate('jwt',{session: false}),userController.delete);

router.get('/login/auth', userController.login);

// middleware

module.exports = router
