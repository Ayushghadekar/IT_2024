const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  Subscription:{
    type:Number,
    require:true
  },
  SevarthID: {
    type: String,
    required: true,
    unique:true
  },
  Income:{
    type : Number,
    required:true
  },
  Institute:{
    type:String,
    required:true
  },
  Shares:{
    type:Number,
    required:true
  },
  Post:{
    type:String,
    required:true
  },
  DateOfJoining:{
    type:Date,
    required:true,
  },
  DateOfRetirement:{
    type:Date,
    require:true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  EditingDetail:[{
    By:{type:mongoose.Schema.Types.ObjectId, ref:'body'},
    timestamp: {
      type: Date,
      default: Date.now
    }
  }
  ],
  Transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }],
  Loan:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Loan"
  }]
});

// Institute;
// Referace;
// severtHId;

// underTaking;
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
