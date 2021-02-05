const express = require('express')
const router = express.Router()

const smsController = require('../controllers/sms.controller');

// Retrieve all smss
router.get('/', smsController.findAll);
// Create a new sms
router.post('/', smsController.create);
// Retrieve a single sms with id
router.get('/:id', smsController.findById);
// Update a sms with id
router.put('/:id', smsController.update);
// Delete a sms with id
router.delete('/:id', smsController.delete);

module.exports = router
