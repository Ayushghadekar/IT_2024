const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Create a new loan
router.post('/', loanController.createLoan);
router.post('/createLoanRepaymentSchedule/:id', loanController.createLoanRepaymentSchedule);
// Get all loans
router.get('/', loanController.getLoans);


// Get loan by ID
router.get('/:id', loanController.getLoanById);

// Update loan
router.put('/:id', loanController.updateLoan);

// Delete loan
router.delete('/:id', loanController.deleteLoan);

module.exports = router;
