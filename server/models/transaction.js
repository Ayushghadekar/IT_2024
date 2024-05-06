const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type:{
    type : String ,
    enum: ['Lone' , 'Subscription'],
    required:true,
  },
  ChequeNo:{
    type: String,
  },
  Status:{
    type :String ,
    default:"UnVarified",
    required:true,
    enum:["Varified","UnVarified"]
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
