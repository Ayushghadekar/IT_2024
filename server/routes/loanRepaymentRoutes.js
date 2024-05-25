const express = require('express');
const router = express.Router();
const loanRepaymentController = require('../controllers/loanRepaymentController');

// Create a new loan repayment
router.post('/', loanRepaymentController.createLoanRepayment);

// Get all loan repayments
router.get('/', loanRepaymentController.getLoanRepayments);
router.put('/updateStatus/:id', loanRepaymentController.updateLoanRepaymentStatus);
// Get loan repayment by ID
router.get('/:id', loanRepaymentController.getLoanRepaymentById);
router.get('/this',loanRepaymentController.getLoanRepaymentsThis)
// Update loan repayment
router.put('/:id', loanRepaymentController.updateLoanRepayment);

// Delete loan repayment
router.delete('/:id', loanRepaymentController.deleteLoanRepayment);

module.exports = router;
