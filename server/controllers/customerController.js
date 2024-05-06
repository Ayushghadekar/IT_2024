const Customer = require('../models/customer');
const Transaction = require('../models/transaction')
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
    // Find all transactions with Status "UnVarified"
 // Find all transactions with Status "UnVarified"
 const transactions = await Transaction.find({ Status: "UnVarified" });

 // Initialize a Set to store unique transaction IDs
 const uniqueTransactionIds = new Set();

 // Initialize an array to store unpaid customers
 const unpaidCustomers = [];

 // Iterate through transactions
 for (const transaction of transactions) {
   // Ensure the transaction ID is unique
   if (!uniqueTransactionIds.has(String(transaction._id))) {
     // Add the transaction ID to the Set of unique transaction IDs
     uniqueTransactionIds.add(String(transaction._id));

     // Find the customer associated with this transaction
     const customer = await Customer.findById(transaction.customerId);

     // Add the customer and transaction to the unpaidCustomers array
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

 // Send the unpaid customers as response
 res.json(unpaidCustomers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
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
