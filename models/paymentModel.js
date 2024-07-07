const mongoose = require('mongoose')

const Schema =mongoose.Schema

const paymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    orderId: {
        type: String,
        required:true,
    },
    paymentId: {
        type: String,
        required:true
    },
    paymentDate: {
        type: Date,
        default: Date.now,
        required:true
    },
    dueDate: {
        type: Date,
        required:true
    }
})

const paymentModel = new mongoose.model('payment', paymentSchema)

module.exports = paymentModel

