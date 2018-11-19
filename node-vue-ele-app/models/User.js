const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    identity:{
        type:String,
        required:true
    },
    data:{
        type:Date,
        default:new Date()
    }

})

module.exports = mongoose.model('User',UserSchema)
