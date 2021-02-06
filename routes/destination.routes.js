const express = require('express')
const router = express.Router()
const passport = require('passport')

const destinationController = require('../controllers/destination.controller');

// authentication middleware
router.use( passport.authenticate('jwt',{session: false}));

//
router.get('/contacts_messages', destinationController.getContactsGroupMessage);

router.get('/messages_for_contact/:contact_id',destinationController.getMessagesForGroupContact)

// Retrieve all destinations
router.get('/', destinationController.findAll);
// Create a new destination
router.post('/', destinationController.create);
// Retrieve a single destination with id
router.get('/:id', destinationController.findById);
// Update a destination with id
router.put('/:id', destinationController.update);
// Delete a destination with id
router.delete('/:id', destinationController.delete);




module.exports = router
