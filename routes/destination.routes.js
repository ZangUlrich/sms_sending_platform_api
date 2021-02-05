const express = require('express')
const router = express.Router()

const destinationController = require('../controllers/destination.controller');

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
