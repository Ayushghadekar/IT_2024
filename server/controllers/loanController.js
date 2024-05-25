const Loan = require('../models/loan');
const Customer = require('../models/customer');
const LoanRepayment = require('../models/loanRepayment');
const axios = require('axios');

function calculateCompoundInterest(principal, rate, time) {
  return principal * Math.pow((1 + rate), time);
}

const getTotalFunds = async () => {
  const allCustomers = await Customer.find();
  let totalShares = 0;
  let totalCustomers = allCustomers.length;

  allCustomers.forEach(customer => {
    totalShares += customer.Shares;
  });

  const allLoans = await Loan.find({ Status: "Approved" });
  let totalApprovedLoans = 0;
  allLoans.forEach(loan => {
    totalApprovedLoans += loan.amount;
  });

  const allLoanRepayments = await LoanRepayment.find({ status: true });
  let totalRepaidAmount = 0;
  allLoanRepayments.forEach(repayment => {
    totalRepaidAmount += repayment.amount;
  });

  totalShares = totalShares - totalApprovedLoans + totalRepaidAmount;

  return {
    totalShares
  };
};

function calculateMonthlyPayment(principal, interestRate, term) {
  const monthlyInterestRate = interestRate / 12;
  const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term);
  const denominator = Math.pow(1 + monthlyInterestRate, term) - 1;
  return numerator / denominator;
}

exports.createLoan = async (req, res) => {
  try {
    const customerId = req.body.customerId;
    const customer = await Customer.findById(customerId);
    const Gur1 = await Customer.findOne({ SevarthID: req.body.Gur1 });
    const Gur2 = await Customer.findOne({ SevarthID: req.body.Gur2 });

    if (!customer) {
      return res.status(404).json({ message: 'Account not found for this customer' });
    }

    const loan = await Loan.create(req.body);
    loan.Gurentier1 = Gur1._id;
    loan.Gurentier2 = Gur2._id;

    const nomini1 = await Customer.findById(Gur1._id);
    const nomini2 = await Customer.findById(Gur2._id);
    loan.Gurentier1Name = nomini1.name;
    loan.Gurentier2Name = nomini2.name;

    loan.startDate = new Date();
    customer.Loan.push(loan._id);
    await Promise.all([loan.save(), customer.save()]);

    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    if (req.body.Status === "Approved") {
      const { totalShares } = await getTotalFunds();
      if (totalShares > loan.amount) {
        loan.Status="Approved";
        loan.save();
        await axios.post(`http://localhost:3000/api/loans/createLoanRepaymentSchedule/${req.params.id}`);
      } else {
        return res.status(400).json({ message: "Insufficient funds" });
      }
    }

    res.json(loan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

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
      return res.status(404).json({ message: 'Loan not found' });
    }
    if (loan.Status === "Approved") {
      const { amount, interestRate, term, startDate } = loan;
      const monthlyRate = interestRate / 12;
      const monthlyPayment = calculateMonthlyPayment(amount, monthlyRate, term);
      let remainingBalance = amount;
      let currentDate = new Date(startDate);

      for (let i = 0; i < term; i++) {
        const interest = remainingBalance * monthlyRate;
        const principal = monthlyPayment - interest;
        remainingBalance -= principal;

        const loanRepayment = new LoanRepayment({
          loanId,
          amount: monthlyPayment,
          interest: interest,
          principal: principal,
          ChequeNo: "YourChequeNo",
          timestamp: new Date(currentDate)
        });

        await loanRepayment.save();

        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      res.status(200).json({ message: 'Loan repayment schedule created successfully' });
    }
  } catch (error) {
    console.error('Error creating loan repayment schedule:', error.message);
    res.status(500).json({ message: error.message });
  }
};
