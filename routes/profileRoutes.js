const express = require('express')
const router = express.Router()

const protect =require('../middleware/authMiddleware')
const {
    profileHome,
    getProfiles,
    addProfile,
    getProfile,
    updateProfile,
    deleteProfile,
    updateProfilePic,
    deleteProfilePic,
    updateImage1,
    deleteImage1,
    updateImage2,
    deleteImage2,
    getMatchingProfiles,
    getFreshProfiles,
    getSentInterestProfiles,
    getReceivedInterestProfiles,
    getMutualInterestProfiles } = require('../controllers/profileController')

const { profilePicUpload,
    image1Upload,
    image2Upload } = require('../utils/fileUpload')



// basic profile routes    
router.route('/').get(protect, profileHome)
router.route('/profiles').get(protect, getProfiles)
router.route('/profiles').post(protect, addProfile)
router.route('/profiles/:id').get(protect, getProfile)
router.route('/profiles/:id').patch(protect,updateProfile)
router.route('/profiles/:id').delete(protect, deleteProfile)

// routes related to images
router.route('/profiles/profile-pic/:id').patch(protect, profilePicUpload('./storage/images'), updateProfilePic)
router.route('/profiles/profile-pic/:id').delete(protect, deleteProfilePic)
router.route('/profiles/image1/:id').patch(protect,image1Upload('./storage/images'),updateImage1)
router.route('/profiles/image1/:id').delete(protect,deleteImage1)
router.route('/profiles/image2/:id').patch(protect,image2Upload('./storage/images'),updateImage2)
router.route('/profiles/image2/:id').delete(protect,deleteImage2)

// routes related to profile access
router.route('/profiles/get-matching-profiles/:id').get(protect, getMatchingProfiles)
router.route('/profiles/get-fresh-profiles/:id').get(protect,getFreshProfiles)
router.route('/profiles/get-sent-interest-profiles/:id').get(protect, getSentInterestProfiles)
router.route('/profiles/get-received-interest-profiles/:id').get(protect, getReceivedInterestProfiles)
router.route('/profiles/get-mutual-interest-profiles/:id').get(protect,getMutualInterestProfiles)


module.exports = router
