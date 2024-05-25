const LoanRepayment = require('../models/loanRepayment');
const moment = require('moment');
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
exports.getLoanRepaymentsThis= async (req, res) => {
  const currentMonth = moment().month();
  const currentYear = moment().year();

  try {
    // Use aggregation to filter documents for the current month
    const loanRepayments = await LoanRepayment.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $month: '$timestamp' }, currentMonth + 1] }, // MongoDB month is 1-indexed, hence +1
              { $eq: [{ $year: '$timestamp' }, currentYear] }
            ]
          }
        }
      }
    ]);
    res.status(200).send(loanRepayments);
  }catch{};
};
// Get loan repayment by ID
exports.getLoanRepaymentById = async (req, res) => {
  try {
    const id=req.params.id;
    const loanRepayment = await LoanRepayment.find({loanId:id});
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
       const updateData = {
      ...req.body,
      timestamp: new Date() // Update the timestamp to the current date and time
    };
    const loanRepayment = await LoanRepayment.findByIdAndUpdate(req.params.id,updateData, { new: true });
    res.json(loanRepayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.updateLoanRepaymentStatus = async (req, res) => {
  try {
    const updateData = {
      status: true,
      ChequeNo: req.body.cheque, // Add cheque number from the request body
      timestamp: new Date() // Update the timestamp to the current date and time
    };

    const loanRepayment = await LoanRepayment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // Return the updated document
    );

    if (!loanRepayment) {
      return res.status(404).json({ message: 'Loan repayment not found' });
    }

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
