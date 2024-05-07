const Loan = require('../models/loan');
const Customer=require('../models/customer')
const LoanRepayment=require('../models/loanRepayment')
const axios=require('axios')
function calculateCompoundInterest(principal, rate, time) {
  return principal * Math.pow((1 + rate), time);
}

// Function to calculate monthly payment
function calculateMonthlyPayment(principal, interestRate, term) {
  const monthlyInterestRate = interestRate / 12;
  const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term);
  const denominator = Math.pow(1 + monthlyInterestRate, term) - 1;
  return numerator / denominator;
}
// http://localhost:5173/profile/663723fb5343a5f434552735
// Create a new loan
exports.createLoan = async (req, res) => {
  try {
    const customerId = req.body.customerId;
    const customer= await Customer.findById(customerId);
    const Gur1=await Customer.findOne({SevarthID:req.body.Gur1})
    const Gur2=await Customer.findOne({SevarthID:req.body.Gur2})
    if (!customer) {
      return res.status(404).json({ message: 'Account not found for this customer' });
    }
    const loan = await Loan.create(req.body);
    loan.Gurentier1=Gur1._id;
    loan.Gurentier2=Gur2._id;
    loan.startDate=new Date();
    customer.Loan.push(loan._id);
    await Promise.all([loan.save(), customer.save()]);
    const id=loan._id;
    const res2= await axios.post(`http://localhost:3000/api/loans/createLoanRepaymentSchedule/${id}`);
    console.log(res2);
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all loans
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get loan by ID
exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getLoanByCustomerId = async (req, res) => {
  try {
    const loan = await Loan.findOne({ customerId: req.params.id });
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update loan
exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(loan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete loan
exports.deleteLoan = async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Loan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createLoanRepaymentSchedule = async (req, res) => {
  try {
      const loanId = req.params.id;
      const loan = await Loan.findById(loanId);

      if (!loan) {
          throw new Error('Loan not found');
      }

      const { amount, interestRate, term, startDate } = loan;
      const monthlyPayment = calculateMonthlyPayment(amount, interestRate, term);
      const remainingBalance = amount;
      let currentDate = new Date(startDate);
      let currentBalance = amount;

      for (let i = 0; i < term; i++) {
          const interest = currentBalance * interestRate;
          const principal = monthlyPayment - interest;

          // Calculate compound interest
          currentBalance = calculateCompoundInterest(currentBalance, interestRate, 1);

          // Create loan repayment entry
          const loanRepayment = new LoanRepayment({
              loanId,
              amount: monthlyPayment,
              ChequeNo: "YourChequeNo",
              timestamp: currentDate
          });

          await loanRepayment.save();

          // Move to next month
          currentDate.setMonth(currentDate.getMonth() + 1);
      }
      res.status(200).json({ message: 'Loan repayment schedule created successfully' });
  } catch (error) {
      console.error('Error creating loan repayment schedule:', error.message);
      res.status(500).json({ message: error.message });
  }
}