const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum:['male','female']
    },
    dob: {
        type: Date,
        required:true
    },
    height: String,
    weight: String,
    complexion: String,
    bodytype: String,
    physicalStatus: String,
    bloodGroup: String,
    mothertongue: String,
    languages: [{
        type:String
    }],
    religion: String,
    caste: String,
    profilePic: String,
    profileCompletion: {
        type: String,
        default:"0"
    },
    advanceProfileStatus: {
        type: Boolean,
        default:false
    },
    aboutMe: String,
    countryLiving: String,
    currentLocation: String,
    nativePlace: String,
    diet: String,
    smoking: String,
    drinking: String,
    occupation: String,
    annualIncome: String,
    residential:String,
    family: {},
    education: {},
    contact: {},
    image1: String,
    image2: String,
    accountStatus: {
        type: Boolean,
        default:false
    }

},
{
timestamps: true 
}

)

const profileModel = new mongoose.model('profile', profileSchema)

module.exports = profileModel
