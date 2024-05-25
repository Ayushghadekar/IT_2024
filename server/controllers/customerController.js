const Customer = require('../models/customer');
const Transaction = require('../models/transaction')
const Loan = require('../models/loan')
const LoanRepayment = require('../models/loanRepayment')
exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json("Customer Created Successfully");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.unpaid = async (req, res) => {
  try {
 const transactions = await Transaction.find({ Status: "UnVarified" });
 const uniqueTransactionIds = new Set();
 const unpaidCustomers = [];
 for (const transaction of transactions) {
   if (!uniqueTransactionIds.has(String(transaction._id))) {
     uniqueTransactionIds.add(String(transaction._id));
     const customer = await Customer.findById(transaction.customerId);
     unpaidCustomers.push({
       id: customer._id,
       name: customer.name,
       SevarthID: customer.SevarthID,
       transaction: {
         id: transaction._id,
         amount: transaction.amount,
         type: transaction.type,
         Status: transaction.Status,
         timestamp: transaction.timestamp
       }
     });
   }
 }
 res.json(unpaidCustomers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Get all customers

exports.getCustomers = async (req, res) => {
  try {
    const allCustomers = await Customer.find({});
    res.status(201).json(allCustomers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCustomersDash = async (req, res) => {
  try {
    // Fetch all customers
    const allCustomers = await Customer.find();
    let totalShares = 0;
    let length = 0;

    // Fetch all loans
    const allLoans = await Loan.find({ Status: "Approved" });

    // Calculate total approved loan amount
    let totalApprovedLoans = 0;
    allLoans.forEach(loan => {
      totalApprovedLoans += loan.amount;
    });

    // Fetch all loan repayments
    const allLoanRepayments = await LoanRepayment.find({ status: true });

    // Calculate total repaid amount
    let totalRepaidAmount = 0;
    allLoanRepayments.forEach(repayment => {
      totalRepaidAmount += repayment.amount;
    });

    // Calculate total shares and the number of customers
    allCustomers.forEach(customer => {
      totalShares += customer.Shares;
      length++;
    });

    // Adjust total shares by subtracting approved loans and adding repaid amounts
    totalShares = totalShares - totalApprovedLoans + totalRepaidAmount;

    // Send the response
    res.status(201).json({
      message: "Customer data retrieved successfully",
      allCustomers,
      totalShares,
      length,
      totalApprovedLoans
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('Transactions').populate('Loan');
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
