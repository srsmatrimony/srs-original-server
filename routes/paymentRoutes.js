const express = require('express')
const router = express.Router()

const protect =require('../middleware/authMiddleware')

const {
    paymentHome,
    getOrderDetails,
    addOrderDetails,
    addOrder,
    verifyOrder,
    getAccount,
    deleteAccount } = require('../controllers/paymentController')

router.route('/').get(protect, paymentHome)
router.route('/order-details').get(protect,getOrderDetails)
router.route('/order-details').post(protect,addOrderDetails)
router.route('/orders').post(protect,addOrder)
router.route('/verify').post(protect,verifyOrder)
router.route('/account/:id').get(protect, getAccount)
router.route('/account/:id').delete(protect, deleteAccount)

module.exports = router
