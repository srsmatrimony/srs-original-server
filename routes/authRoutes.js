const express = require('express')
const router = express.Router()

const protect = require('../middleware/authMiddleware')

const { authHome,
    registerUser,
    loginUser,
    requestResetPassword,
    resetPassword,
    deactivateAccount } = require('../controllers/authController')
    

router.get('/', authHome)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/request-reset-password', requestResetPassword)
router.post('/reset-password',resetPassword)
router.route('/deactivate-account/:id').delete(protect, deactivateAccount)

module.exports = router