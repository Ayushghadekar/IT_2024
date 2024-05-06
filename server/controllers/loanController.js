const Loan = require('../models/loan');
const Customer=require('../models/customer')
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
    customer.Loan.push(loan._id);
    await Promise.all([loan.save(), customer.save()]);

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
