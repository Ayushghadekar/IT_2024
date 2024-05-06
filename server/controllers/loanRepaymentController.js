const LoanRepayment = require('../models/loanRepayment');

// Create a new loan repayment
exports.createLoanRepayment = async (req, res) => {
  try {
    const loanRepayment = await LoanRepayment.create(req.body);
    res.status(201).json(loanRepayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all loan repayments
exports.getLoanRepayments = async (req, res) => {
  try {
    const loanRepayments = await LoanRepayment.find();
    res.json(loanRepayments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get loan repayment by ID
exports.getLoanRepaymentById = async (req, res) => {
  try {
    const loanRepayment = await LoanRepayment.findById(req.params.id);
    if (!loanRepayment) {
      return res.status(404).json({ message: 'Loan repayment not found' });
    }
    res.json(loanRepayment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update loan repayment
exports.updateLoanRepayment = async (req, res) => {
  try {
    const loanRepayment = await LoanRepayment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(loanRepayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete loan repayment
exports.deleteLoanRepayment = async (req, res) => {
  try {
    await LoanRepayment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Loan repayment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
