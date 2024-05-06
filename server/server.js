const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');
// const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const loanRoutes = require('./routes/loanRoutes');
const loanRepaymentRoutes = require('./routes/loanRepaymentRoutes');
var cors = require('cors') 
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const app = express();
app.use(cors(corsOptions))

app.use(bodyParser.json());

app.use('/api/customers', customerRoutes);
// app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/loanRepayments', loanRepaymentRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the Bank Management System!'); // Send welcome message as response
  });

mongoose.connect('mongodb://localhost:27017/bank_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start server
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

  });
})
.catch(err => console.error('Error connecting to MongoDB:', err));
