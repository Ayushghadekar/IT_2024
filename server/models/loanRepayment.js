const mongoose = require('mongoose');

const loanRepaymentSchema = new mongoose.Schema({
  loanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status:{
    type:Boolean,
    require:true,
    default:false
  },
  ChequeNo:{
    type:String,
    required:true,
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const LoanRepayment = mongoose.model('LoanRepayment', loanRepaymentSchema);
                                      
module.exports = LoanRepayment;
                    