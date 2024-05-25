const Transaction = require('../models/transaction');
const Customer = require("../models/customer")
const LoanRepayment = require("../models/loanRepayment")
exports.createTransaction = async (req, res) => {
  try {
    const customerId = req.body.customerId;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Account not found for this customer' });
    }
    const transaction = await Transaction.create(req.body);
    customer.Transactions.push(transaction._id); // Note the change here
    await Promise.all([transaction.save(), customer.save()]);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getHistory = async (req, res) => {
  try {
    // Fetch all transactions and populate customer names
    const transactions = await Transaction.find()
      .populate('customerId', 'name') // Assuming 'name' is the field in the Customer schema
      .exec();

    // Fetch all loan repayments and populate customer names via loan
    const loanRepayments = await LoanRepayment.find()
      .populate({
        path: 'loanId',
        populate: {
          path: 'customerId',
          model: 'Customer',
          select: 'name'
        }
      })
      .exec();

    // Format transactions with Status: "Verified"
    const formattedTransactions = transactions
      .filter(transaction => transaction.Status === 'Varified')
      .map(transaction => ({
        name: transaction.customerId.name,
        paymentFor: transaction.type === 'Loan' ? 'Loan' : 'Subscription',
        chequeNo: transaction.ChequeNo,
        date: transaction.timestamp
      }));

    // Format loan repayments with status: true
    const formattedLoanRepayments = loanRepayments
      .filter(repayment => repayment.status === true)
      .map(repayment => ({
        name: repayment.loanId.customerId.name,
        paymentFor: 'Loan Repayment',
        chequeNo: repayment.ChequeNo,
        date: repayment.timestamp
      }));

    const history = [...formattedTransactions, ...formattedLoanRepayments];

    res.status(200).json({
      message: 'Transaction and loan repayment history retrieved successfully',
      history
    });
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.verifyPayment = async (req, res) => {
  let transactionID = req.params.id;
  console.log(transactionID);
  try {
    const { cheque } = req.body;
    const transaction = await Transaction.findById(transactionID);
    if (!transaction) {
      throw new Error("Transaction does not exist");
    }
    const customer = await Customer.findById(transaction.customerId);
    transaction.ChequeNo = cheque;
    transaction.Status = "Varified";
    transaction.timestamp = new Date();  // Set status to 'Verified' when cheque is provided
    customer.Shares += transaction.amount;
    await customer.save();
    await transaction.save();
    res.status(200).json(transaction);
  } catch (err) {
    console.error("Error in verifyPayment:", err);
    res.status(400).json({ error: err.message });
  }
};

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get transaction by ID
exports.createSchedule = async (req, res) => {
  try {
    const status = 'UnPaid'; // Transaction status
    const customers = await Customer.find(); // Fetch all customers from database

    // Iterate through each customer and create transaction
    const transactions = await Promise.all(customers.map(async (customer) => {
      const transaction = await Transaction.create({
        customerId: customer._id,
        amount: customer.Subscription,
        type: 'Subscription',
        status: status,
      });
      customer.Transactions.push(transaction._id);
      await customer.save();
      return transaction;
    }));

    res.status(201).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
