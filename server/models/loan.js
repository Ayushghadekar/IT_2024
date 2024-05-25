const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number,
    default:0.09,
    required: true
  },
  type:{
    type : String ,
    default:'Long term',
    required:true
  },
  term: {
    type: Number,
    required: true
  },
  remainingBalance: {
    type: Number,
  },
  monthlyPayment: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    // required:true
  },
  endDate: {
    type: Date,

  },
  DemandForLone:{
    type:String,
    require:true
  },
  Nomini:{
    type:String,
    required:true,
  },
  NominiRelation:{
    type:String,
    required:true
  },
  PaymentChequeNo:{
    type:String,
  },
  Status:{
    type:String,
    default:"underProcessing",
    enum:["underProcessing","Approved","Reject","Deposited"],
    required:true
  },
  Gurentier1:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Customer"
  },
  Gurentier1Name:{
    type:String,
  },
  Gurentier2Name:{
    type:String,
  },
  Gurentier2:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Customer"
  },
  LoneRepayment:[{
    Repayment:{type:mongoose.Schema.Types.ObjectId , ref:"LoanRepayment"},
   }
  ]
});
// lonefor;
// demand;
// proof; 
const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
