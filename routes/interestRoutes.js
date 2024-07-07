const express = require('express')
const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
    interestHome,
    getInterests,
    addInterest,
    getInterest,
    updateInterest,
    deleteInterest,
    getSentInterests,
    getReceivedInterests,
    getMutualInterests } = require = require('../controllers/interestController')


router.route('/').get(protect, interestHome)
router.route('/interests').get(protect, getInterests)
router.route('/interests').post(protect, addInterest)
router.route('/interests/:id').get(protect, getInterest)
router.route('/interests/:id').patch(protect, updateInterest)
router.route('/interests/:id').delete(protect, deleteInterest)
router.route('/interests/sent-interests/:id').get(protect, getSentInterests)
router.route('/interests/received-interests/:id').get(protect, getReceivedInterests)
router.route('/interests/mutual-interests/:id').get(protect, getMutualInterests)


module.exports = router
