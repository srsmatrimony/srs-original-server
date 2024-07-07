const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    
    accountId: {
        type: String,
        required:true
    },
    name: {
        type:String
    },
    email: {
        type: String,
        required:true
    },
    amount: {
        type: Number,
        required:true
    },
    splitAmount: {
        type: Number,
        required: true
    },
    validityMonths: {
        type: Number,
        required:true
    }
})

const orderModel = new mongoose.model('order', orderSchema)

module.exports = orderModel
