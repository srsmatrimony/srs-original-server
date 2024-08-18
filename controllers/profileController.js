const path = require('path')
const fs =require('fs')
const asyncHandler = require('express-async-handler')

// models
const profileModel = require('../models/profileModel')
const interestModel = require('../models/interestModel')
const paymentModel = require('../models/paymentModel')
const { baseUrl } = require('../config/Constants')

// utils
const existFile = require('../utils/existFile')


const profileHome = asyncHandler(async (req, res) => {

    res.status(200).json({ message: "Profile Home Page" })

})

const getProfiles = asyncHandler(async (req, res) => {
    
    const profiles = await profileModel.find()

    // check there exist any profiles or not

    if (profiles.length != 0) {
        
        res.status(200).json(profiles)

    }
    else {
        res.status(404)
        throw new Error('No Profiles Found')
    }

})

const addProfile = asyncHandler(async(req, res) => {
    const newProfile = req.body 
    const { email } = newProfile
    
    // check whether the profile is already existing in db

    const existingProfile = await profileModel.findOne({ email })
    
    if (existingProfile) {
        
        res.status(409)
        throw new Error('Profile already Exist for User')

    }

    // create new profile in db
    const profile = await profileModel.create(newProfile)

    if (profile) {
        
        res.status(200).json(profile)
        
    }
    else {
        
        res.status(400)
        throw new Error('Invalid Profile')

    }


})

const getUserProfile = asyncHandler(async (req, res) => {
    
    const { email } = req.body
    // access profile with specific email
    const currentUserProfile = await profileModel.findOne({ email })

    if (currentUserProfile) {
        

        // check for the existance of profilePic in storage
        const currentProfilePic = currentUserProfile.profilePic
        const { id } = currentUserProfile
    

        if (currentProfilePic) {
        
            const currentProfilePicName = currentProfilePic.match(/\/([^\/?#]+)[^\/]*$/)
            const currentProfilePicPath = path.resolve(__dirname, '../storage/images', currentProfilePicName[1])
        
            // findout the status of the file existence 
            const existStatus = existFile(currentProfilePicPath)

            // remode database entry if file is not existing
            if (!existStatus) {
            
                currentUserProfile.profilePic = ""
                await profileModel.findByIdAndUpdate(id, currentUserProfile)

            }
        

        }

        // check for the existance of image1 in storage
        const currentImage1 = currentUserProfile.image1

        if (currentImage1) {
        
            const currentImage1Name = currentImage1.match(/\/([^\/?#]+)[^\/]*$/)
            const currentImage1Path = path.resolve(__dirname, '../storage/images', currentImage1Name[1])

        
            // findout the status of the file existence 
            const existStatus = existFile(currentImage1Path)

            // remode database entry if file is not existing
            if (!existStatus) {
            
                currentUserProfile.image1 = ""
                await profileModel.findByIdAndUpdate(id, currentUserProfile)

            }
        

        }

        // check for the existance of image2 in storage
        const currentImage2 = currentUserProfile.image2

        if (currentImage2) {
        
            const currentImage2Name = currentImage1.match(/\/([^\/?#]+)[^\/]*$/)
            const currentImage2Path = path.resolve(__dirname, '../storage/images', currentImage2Name[1])

        
            // findout the status of the file existence 
            const existStatus = existFile(currentImage2Path)

            // remode database entry if file is not existing
            if (!existStatus) {
            
                currentUserProfile.image2 = ""
                await profileModel.findByIdAndUpdate(id, currentUserProfile)

            }
        

        }
  
    }
    

    // find the user profile agaian
    
    const userProfile = await profileModel.findOne({ email })


    // check specified user profile exists or not
    if (userProfile) {
        res.status(200).json(userProfile)
    }
    else {
        res.status(404)
        throw new Error('Profile Does not Exist')
    }
    
    // res.status(200).json({ message: "success" })

})

const getProfile = asyncHandler(async (req, res) => {
    const { id } = req.params
    
    // access the profile with specified profile id
    const currentProfile = await profileModel.findById(id)

    if (currentProfile) {
        

        // check for the existance of profilePic in storage
        const currentProfilePic = currentProfile.profilePic
        const { id } = currentProfile
    

        if (currentProfilePic) {
        
            const currentProfilePicName = currentProfilePic.match(/\/([^\/?#]+)[^\/]*$/)
            const currentProfilePicPath = path.resolve(__dirname, '../storage/images', currentProfilePicName[1])
        
            // findout the status of the file existence 
            const existStatus = existFile(currentProfilePicPath)

            // remode database entry if file is not existing
            if (!existStatus) {
            
                currentProfile.profilePic = ""
                await profileModel.findByIdAndUpdate(id, currentProfile)

            }
        

        }

        // check for the existance of image1 in storage
        const currentImage1 = currentProfile.image1

        if (currentImage1) {
        
            const currentImage1Name = currentImage1.match(/\/([^\/?#]+)[^\/]*$/)
            const currentImage1Path = path.resolve(__dirname, '../storage/images', currentImage1Name[1])

        
            // findout the status of the file existence 
            const existStatus = existFile(currentImage1Path)

            // remode database entry if file is not existing
            if (!existStatus) {
            
                currentProfile.image1 = ""
                await profileModel.findByIdAndUpdate(id, currentProfile)

            }
        

        }

        // check for the existance of image2 in storage
        const currentImage2 = currentProfile.image2

        if (currentImage2) {
        
            const currentImage2Name = currentImage1.match(/\/([^\/?#]+)[^\/]*$/)
            const currentImage2Path = path.resolve(__dirname, '../storage/images', currentImage2Name[1])

        
            // findout the status of the file existence 
            const existStatus = existFile(currentImage2Path)

            // remode database entry if file is not existing
            if (!existStatus) {
            
                currentProfile.image2 = ""
                await profileModel.findByIdAndUpdate(id, currentProfile)

            }
        

        }
  
    }
    
    const profile = await profileModel.findById(id)

    // check specified user profile exists or not
    if (profile) {
        res.status(200).json(profile)
    }
    else {
        res.status(404)
        throw new Error('Profile Does not Exist')
    }

})

const updateProfile = asyncHandler(async (req, res) => {
    const { id } = req.params
    const profile = req.body
    
    // update the current profile from req.body

    await profileModel.findByIdAndUpdate(id, profile)
    

    // access the updated profile
    
    const updatedProfile = await profileModel.findById(id)

    // check the updation status and return the same

    if (updatedProfile) {
        res.status(200).json(updatedProfile)
    }
    else {
        res.status(404)
        throw new Error('Profile Does not Exist')
    }

    
})

const deleteProfile = asyncHandler(async (req, res) => {
    const { id } = req.params


    // delete associated payment with this profile

    const account = await paymentModel.findOne({ userId: id })
    
    if (account) {
        await paymentModel.findByIdAndDelete(account._id)

    }
    
    // delete associated interests with this profile

    const allInterests = await interestModel.find()
    if (allInterests.length >= 0) {
        
        const userInterests = allInterests.filter(interest => (interest.sender === id || interest.receiver === id))
        const l = userInterests.length;
    
        if (l > 0) {
             let i;
            for (i = 0; i < l; i++){
                await interestModel.findByIdAndDelete(userInterests[i]);
            }   
        }
    }
    
    const currentProfile = await profileModel.findById(id)
    
    // remove associated profile pic

    const currentProfilePic = currentProfile.profilePic
    if (currentProfilePic) {
        
        const currentProfilePicName = currentProfilePic.match(/\/([^\/?#]+)[^\/]*$/)
        const currentProfilePicPath = path.resolve(__dirname, '../storage/images', currentProfilePicName[1])
        fs.unlinkSync(currentProfilePicPath)

    }

    // remove existsing image1

    const currentImage1 = currentProfile.image1
    if (currentImage1) {
        
        const currentImage1Name = currentImage1.match(/\/([^\/?#]+)[^\/]*$/)
        const currentImage1Path = path.resolve(__dirname, '../storage/images', currentImage1Name[1])
        fs.unlinkSync(currentImage1Path)

    }

    // remove existsing image2

    const currentImage2 = currentProfile.image2
    if (currentImage2) {
        
        const currentImage2Name = currentImage2.match(/\/([^\/?#]+)[^\/]*$/)
        const currentImage2Path = path.resolve(__dirname, '../storage/images', currentImage2Name[1])
        fs.unlinkSync(currentImage2Path)

    }


    // delete the current profile

    await profileModel.findByIdAndDelete(id)
    
    // check the deleted profile exists or not

    const deletedProfile = await profileModel.findById(id)

    if (!deletedProfile) {
        res.status(200).json({ _id: id })
    }
    else {
        res.status(400)
        throw new Error('Delete Failed')
    }


})

const updateProfilePic = asyncHandler(async (req, res) => {
    const { id } = req.params
    const profile = {}
    var imgUrl = ''
    if (req.file) {
        
        imgUrl = `${baseUrl}/storage/images/${req.file.filename}`
        
    }

    profile.profilePic = imgUrl

    //to check whether profilePic exists for this profile

    const currentProfile = await profileModel.findById(id)
    const currentProfilePic = currentProfile.profilePic

    if (currentProfilePic) {
        
        const currentProfilePicName = currentProfilePic.match(/\/([^\/?#]+)[^\/]*$/)
        const currentProfilePicPath = path.resolve(__dirname, '../storage/images', currentProfilePicName[1])
        fs.unlinkSync(currentProfilePicPath)

    }

    await profileModel.findByIdAndUpdate(id, profile)
    
    const updatedProfile = await profileModel.findById(id)

    if (updatedProfile) {
        res.status(200).json(updatedProfile)
    }
    else {
        res.status(404)
        throw new Error('Profile Does not Exist')
    }

})

const updateImage1 = asyncHandler(async (req, res) => {

    const { id } = req.params
    const profile = {}
    var imgUrl = ''
    if (req.file) {
        
        imgUrl = `${baseUrl}/storage/images/${req.file.filename}`
        
    }

    profile.image1 = imgUrl

    //to check whether image1 exists for this profile

    const currentProfile = await profileModel.findById(id)
    const currentImage1 = currentProfile.image1

    if (currentImage1) {
        
        const currentImage1Name = currentImage1.match(/\/([^\/?#]+)[^\/]*$/)
        const currentImage1Path = path.resolve(__dirname, '../storage/images', currentImage1Name[1])
        fs.unlinkSync(currentImage1Path)

    }

    await profileModel.findByIdAndUpdate(id, profile)
    
    const updatedProfile = await profileModel.findById(id)

    if (updatedProfile) {
        res.status(200).json(updatedProfile)
    }
    else {
        res.status(404)
        throw new Error('Profile Does not Exist')
    }

})

const updateImage2 = asyncHandler(async (req, res) => {

    const { id } = req.params
    const profile = {}
    var imgUrl = ''
    if (req.file) {
        
        imgUrl = `${baseUrl}/storage/images/${req.file.filename}`
        
    }

    profile.image2 = imgUrl

    //to check whether image2 exists for this profile

    const currentProfile = await profileModel.findById(id)
    const currentImage2 = currentProfile.image2

    if (currentImage2) {
        
        const currentImage2Name = currentImage2.match(/\/([^\/?#]+)[^\/]*$/)
        const currentImage2Path = path.resolve(__dirname, '../storage/images', currentImage2Name[1])
        fs.unlinkSync(currentImage2Path)

    }

    await profileModel.findByIdAndUpdate(id, profile)
    
    const updatedProfile = await profileModel.findById(id)

    if (updatedProfile) {
        res.status(200).json(updatedProfile)
    }
    else {
        res.status(404)
        throw new Error('Profile Does not Exist')
    }

})


const deleteProfilePic = asyncHandler(async (req, res) => {
    const { id } = req.params

    // remove existsing profile pic

    const currentProfile = await profileModel.findById(id)
    const currentProfilePic = currentProfile.profilePic
    if (currentProfilePic) {
        
        const currentProfilePicName = currentProfilePic.match(/\/([^\/?#]+)[^\/]*$/)
        const currentProfilePicPath = path.resolve(__dirname, '../storage/images', currentProfilePicName[1])
        fs.unlinkSync(currentProfilePicPath)
    }

    // database entry is removed

    currentProfile.profilePic = null
    
    await profileModel.findByIdAndUpdate(id, currentProfile)
    
    const picDeletedProfile = await profileModel.findById(id)

    if (!picDeletedProfile.profilePic) {
        
        res.status(200).json(picDeletedProfile)

    }
    else {
        res.status(400)
        throw new Error('Delete profile pic failed')
    }

})

const deleteImage1 = asyncHandler(async (req, res) => {
    
     const { id } = req.params

    // remove existsing image1

    const currentProfile = await profileModel.findById(id)
    const currentImage1 = currentProfile.image1
    if (currentImage1) {
        
        const currentImage1Name = currentImage1.match(/\/([^\/?#]+)[^\/]*$/)
        const currentImage1Path = path.resolve(__dirname, '../storage/images', currentImage1Name[1])
        fs.unlinkSync(currentImage1Path)

    }

    // database entry is removed

    currentProfile.image1 = null
    
    await profileModel.findByIdAndUpdate(id, currentProfile)
    
    const picDeletedProfile = await profileModel.findById(id)

    if (!picDeletedProfile.image1) {
        
        res.status(200).json(picDeletedProfile)

    }
    else {
        res.status(400)
        throw new Error('Delete image1 failed')
    }


})

const deleteImage2 = asyncHandler(async (req, res) => {
    
     const { id } = req.params

    // remove existsing image2

    const currentProfile = await profileModel.findById(id)
    const currentImage2 = currentProfile.image2
    if (currentImage2) {
        
        const currentImage2Name = currentImage2.match(/\/([^\/?#]+)[^\/]*$/)
        const currentImage2Path = path.resolve(__dirname, '../storage/images', currentImage2Name[1])
        fs.unlinkSync(currentImage2Path)

    }

    // database entry is removed

    currentProfile.image2 = null
    
    await profileModel.findByIdAndUpdate(id, currentProfile)
    
    const picDeletedProfile = await profileModel.findById(id)

    if (!picDeletedProfile.image2) {
        
        res.status(200).json(picDeletedProfile)

    }
    else {
        res.status(400)
        throw new Error('Delete image2 failed')
    }


})

const getMatchingProfiles = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    //access the gender and religion of user 

    const userProfile = await profileModel.findById(id)

    const { gender, religion } = userProfile;
    
    // matching profiles satisfying gender and religion criterion

    const matchingProfilesgender = await profileModel.find({ religion }).sort({ createdAt: 'desc' })
    
    const matchingProfiles = matchingProfilesgender.filter(profile => profile.gender !== gender)
    
    // get rejected interests

    const allInterests = await interestModel.find()
    
    const rejectedInterests = allInterests.filter(interest => (interest.sender === id || interest.receiver === id) && interest.status === "reject")
    
    const rejectedInterestIds = rejectedInterests.map(interest => {
        const { sender, receiver } = interest
         
        if (sender === id) {
            return receiver
        }
        else {
            return sender
        }

    });

    const l = rejectedInterestIds.length

    let i

    let finalMatchingProfile =matchingProfiles

    for (i = 0; i < l; i++){
        
       finalMatchingProfile = finalMatchingProfile.filter(profile => profile.id !== rejectedInterestIds[i])
        
    }


    // check whethere matching profiles exists or not

    if (finalMatchingProfile.length != 0) {
        
        res.status(200).json(finalMatchingProfile)

    }
    else {
        res.status(404)
        throw new Error('No Matching Profiles Found')
    }


})

const getFreshProfiles = asyncHandler(async (req, res) => {
     
    const { id } = req.params
    
    //access the gender and religion of user 

    const userProfile = await profileModel.findById(id)

    const { gender, religion } = userProfile;
    
    // matching profiles satisfying gender and religion criterion

    const matchingProfilesgender = await profileModel.find({ religion }).sort({ createdAt: 'desc' })
    
    const matchingProfiles = matchingProfilesgender.filter(profile => profile.gender !== gender)

    // get associated interests

    const allInterests = await interestModel.find()
    
    const interests = allInterests.filter(interest => (interest.sender === id || interest.receiver === id))

    const interestIds = interests.map(interest => {
        
        const { sender, receiver } = interest
        
        if (sender === id) {
            return receiver
        }
        else {
            return sender
        }
    })

    const l = interestIds.length

    let i

    let freshProfiles= matchingProfiles

    for (i = 0; i < l; i++){
        
        freshProfiles = freshProfiles.filter(profile => profile.id !== interestIds[i])
        
    }

     // check whethere fresh profiles exists or not

    if (freshProfiles.length != 0) {
        
        res.status(200).json(freshProfiles)

    }
    else {
        res.status(404)
        throw new Error('No Fresh Profiles Found')
    }
    

})


const getSentInterestProfiles = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    // get interest sent by id

    const sentInterests = await interestModel.find({ sender: id }).sort({ createdAt: 'desc' })
    
    // extract id from interest object

    const sentInterestIds = sentInterests.map(interest => {
        const { receiver } = interest
        return receiver
    })

    // access associated profiles

    const profiles = await profileModel.find();

    const sentInterestProfiles = [];

    sentInterestIds.map(id => {
        let tempProfile = profiles.find(profile => profile.id === id)
        
        sentInterestProfiles.push(tempProfile)

    })

    if (sentInterestProfiles.length !== 0) {
        res.status(200).json(sentInterestProfiles)
    }

    else {
        res.status(404)
        throw new Error('No Interest has sent to any Profiles')
    }

})

const getReceivedInterestProfiles = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    // get interest received by id

    const receivedInterests = await interestModel.find({ receiver: id }).sort({ createdAt: 'desc' })
    
    // extract id from interest object

    const receivedInterestIds = receivedInterests.map(interest => {
        const { sender } = interest
        return sender
    })

    // access associated profiles

    const profiles = await profileModel.find();

    const receivedInterestProfiles = [];

    receivedInterestIds.map(id => {
        let tempProfile = profiles.find(profile => profile.id === id)
        
        receivedInterestProfiles.push(tempProfile)

    })

    if (receivedInterestProfiles.length !== 0) {
        res.status(200).json(receivedInterestProfiles)
    }

    else {
        res.status(404)
        throw new Error('No Ineterst has received from any Profile')
    }


})

const getMutualInterestProfiles = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    const allInterests = await interestModel.find().sort({ createdAt: 'desc' })
    

    // access mutual interests
    const mutualInterests = allInterests.filter(interest => (interest.sender === id || interest.receiver === id) && interest.status === 'accept')

    // get corresponding ids

    const mutualInterestIds = mutualInterests.map(interest => {
        
         const { sender, receiver } = interest
         
        if (sender === id) {
            return receiver
        }
        else {
            return sender
        }
         
    })

    // access associated profiles

    const profiles = await profileModel.find();

    const mutualInterestProfiles = [];

    mutualInterestIds.map(id => {
        let tempProfile = profiles.find(profile => profile.id === id)
        
        mutualInterestProfiles.push(tempProfile)

    })

    if (mutualInterestProfiles.length !== 0) {
        res.status(200).json(mutualInterestProfiles)
    }

    else {
        res.status(404)
        throw new Error('No mutual Interest Exists')
    }


})

module.exports = {
    profileHome,
    getProfiles,
    addProfile,
    getUserProfile,
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
    getMutualInterestProfiles

}

