const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    Funds: {
        type: Number,
        default:0,
        required: true
    },
    AmountinLoan: {
        type: String,
        default:0,
        required: true
    },
});

// Institute;
// Referace;
// severtHId;

// underTaking;
const Funds = mongoose.model('Funds', customerSchema);

module.exports = Funds;
