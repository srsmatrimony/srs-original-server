const mongoose = require('mongoose')

const interestSchema = new mongoose.Schema({

    sender: {
        type: String,
        required:true
    },
    receiver: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'accept', 'reject', 'pending']
    }
},
    {
       timestamps: true 
    }
     
)


const interestModel = new mongoose.model('interest', interestSchema)

module.exports = interestModel
