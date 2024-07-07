const asyncHandler = require('express-async-handler')

const interestModel =require('../models/interestModel')

const interestHome = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Interest Home Page" })
})

const getInterests = asyncHandler(async (req, res) => {
    
    const interests = await interestModel.find()

    if (interests.length !== 0) {
        
        res.status(200).json(interests)
    
    }
    else {
        res.status(404)
        throw new Error('No Interest Found')
    }
})

const addInterest = asyncHandler(async (req, res) => {
    
    const newInterest = req.body

    const { sender, receiver } = newInterest
    
    // check whether the interest is already existing in db

    const existingInterest = await interestModel.findOne({ sender, receiver })
    
    if (existingInterest) {
        
        res.status(409)
        throw new Error('Interst has already sent ')

    }
    
    // create new interest in db

    const interest = await interestModel.create(newInterest)

    if (interest) {
        res.status(200).json(interest)
    }
    else {
        res.status(400)
        throw new Error('Invalid Interest')
    }

})

const getInterest = asyncHandler(async (req, res) => {
    const { id } = req.params
    
    // access the interest with specified interest id
    const interest = await interestModel.findById(id)

    // check specified user interest exists or not

    if (interest) {
        res.status(200).json(interest)
    }
    else {
        res.status(404)
        throw new Error('Interest is Not existing')
    }

})

const updateInterest = asyncHandler(async (req, res) => {
    const { id } = req.params
    
    const interest = req.body
    
    // update the current interest from req.body
    
    await interestModel.findByIdAndUpdate(id, interest)
    
    // access the updated profile

    const updatedInterest = await interestModel.findById(id)

     // check the updation status and return the same

    
    if (updatedInterest) {
        res.status(200).json(updatedInterest)
    }
    else {
        res.status(404)
        throw new Error('Interest is Not existing')
    }

})

const deleteInterest = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    
    // delete the current interest

    await interestModel.findByIdAndDelete(id)

    // check the deleted interest exists or not

    const deletedInterest = await interestModel.findById(id)

    if (!deletedInterest) {
        res.status(200).json({ _id: id })
        
    }
    else {
        res.status(400)
        throw new Error('Delete Failed')
        
    }

})

const getSentInterests = asyncHandler(async (req, res) => {
    
    const { id } = req.params
    // get interest sent by id

    const sentInterests = await interestModel.find({ sender: id })
    
    // check whether there is interests send by this user

    if (sentInterests.length !== 0) {
        
        res.status(200).json(sentInterests)
    }
    else {
        res.status(404)
        throw new Error('No interest has sent by the user')
    }


})

const getReceivedInterests = asyncHandler(async (req, res) => {
    const { id } = req.params

    // get interest received by id
    
    const receivedInterests = await interestModel.find({ receiver: id })
    
    // check whether there is interests received by this user

    if (receivedInterests.length !== 0) {
        res.status(200).json(receivedInterests)
    }
    else {
        res.status(404)
        throw new Error('No interest has received by the user')
    }
})

const getMutualInterests = asyncHandler(async (req, res) => {
    
    const { id } = req.params

    const allInterests = await interestModel.find();

    // access mutual interests
    const mutualInterest = allInterests.filter(interest => (interest.sender === id || interest.receiver === id) && interest.status === 'accept')
        
    if (mutualInterest.length !== 0) {
        
        res.status(200).json(mutualInterest)
    }
    else {
        res.status(404)
        throw new Error('No Mutual Interests')
    }


})

module.exports = {
    interestHome,
    getInterests,
    addInterest,
    getInterest,
    updateInterest,
    deleteInterest,
    getSentInterests,
    getReceivedInterests,
    getMutualInterests
}

