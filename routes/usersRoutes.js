const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// CRUD routes
router.get('/', usersController.getAllUsers);
router.post('/', usersController.register);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;

