const asyncHandler = require('express-async-handler')
const Razorpay = require('razorpay')
const crypto = require('crypto')

const paymentModel = require('../models/paymentModel')
const orderModel =require('../models/orderModel')

const addMonths = require('../utils/addMonths')


const paymentHome = asyncHandler(async (req, res) => {

    res.status(200).json({ message: "Payment Routes : Home" })

})

const getOrderDetails = asyncHandler(async (req, res) => {
    
    const orderDetails = await orderModel.findOne()
    if (orderDetails) {
        res.status(200).json(orderDetails)
    }
    else {
        res.status(404)
        throw new Error("Order Details Not Found")
    }
})

const addOrderDetails = asyncHandler(async (req, res) => {
    
    const newOrderDetails = req.body
    const { accountId } = newOrderDetails
    
    const existingOrderDetails = await orderModel.findOne({ accountId })
    if (existingOrderDetails) {
        await orderModel.deleteOne(existingOrderDetails)

    }

    const orderDetails = await orderModel.create(newOrderDetails)
    if (orderDetails) {
    
        res.status(200).json(orderDetails)
    }
    else {
        res.status(400)
        throw new Error('Invalid Order Details')

    }
    
    
    
})

const addOrder = asyncHandler(async (req, res) => {
    
    const { amount, accountId, splitAmount } = req.body

    const instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret:process.env.KEY_SECRET
    })

    const options = {

        amount: amount*100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString('hex'),
        transfers: [
            {
                account: accountId,
                amount: splitAmount*100,
                currency: "INR",
                notes: {
                    branch: "SRS Matrimony",
                    name: "SRS Matrimony"
                },
                on_hold:0
            }
        ]
    
    }

    instance.orders.create(options, (error, order) => {
        
        if (error) {
            console.log(error)
            return res.status(500).json({message:"Something Went Wrong"})
        }

        res.status(200).json(order)

    })
})

const verifyOrder = asyncHandler(async (req, res) => {
     const {
        razorpay_order_id, razorpay_payment_id, razorpay_signature,userId
    } = req.body

    const { validityMonths } = await orderModel.findOne()
    
    const dueDate = addMonths(new Date(), validityMonths)
    
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    
    const expectedSign = crypto.createHmac("sha256", process.env.KEY_SECRET).update(sign.toString()).digest('hex')

    if (razorpay_signature === expectedSign) {
         
        let existPayment = await paymentModel.findOne({ userId })
        
        if (existPayment) {
            await paymentModel.deleteOne(existPayment)
        }
        
        const newPayment = {
            userId,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            dueDate
        }
        
        await paymentModel.create(newPayment)

        const payment = await paymentModel.findOne({ userId });
        if (payment) {
            res.status(200).json(payment)
        }

        
    }

    else {
        res.status(500)
        throw new Error("Invalid Signature .")
    }

})

const getAccount = asyncHandler(async (req, res) => {
    const { id } = req.params
    
    const account = await paymentModel.findOne({ userId: id })

    if (account) {
        res.status(200).json(account)
    }
    else {
        res.status(404)
        throw new Error('Account Not Found')
    }

})

const deleteAccount = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await paymentModel.deleteOne({ userId: id });

    const deletedProfile = await paymentModel.findOne({ userId: id })
    
    if (!deletedProfile) {
        res.status(200).json({ _id: id })
    }
    else {
        res.status(400)
        throw new Error('Delete Failed')
    }

})


module.exports = {
    paymentHome,
    getOrderDetails,
    addOrderDetails,
    addOrder,
    verifyOrder,
    getAccount,
    deleteAccount
}

