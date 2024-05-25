const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Create a new transaction
router.post('/', transactionController.createTransaction);

// Get all transactions
router.get('/', transactionController.getTransactions);

router.get('/getHistory',transactionController.getHistory)

// Get transaction by ID
router.get('/:id', transactionController.getTransactionById);
// Update a transaction (status)
router.post('/varification/:id',transactionController.verifyPayment)
// Update transaction
router.put('/:id', transactionController.updateTransaction);
//Create Schedule
router.post('/Create_Schedule', transactionController.createSchedule);
// Delete transaction
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
