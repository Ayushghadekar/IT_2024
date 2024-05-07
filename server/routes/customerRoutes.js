const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Create a new customer
router.post('/', customerController.createCustomer);
router.get('/user',customerController.getCustomersDash);
// Get all customers
router.get('/', customerController.getCustomers);

//Get Schadule
router.get('/schedule', customerController.unpaid)
// Get customer by ID
router.get('/:id', customerController.getCustomerById);

// Update customer
router.put('/:id', customerController.updateCustomer);

// Delete customer
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
