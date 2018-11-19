const mongoose = require('mongoose')

const GoodsSchema = mongoose.Schema({
    goodId:Number,
    goodName:String,
    goodPrice:Number,
    goodDec:String
})

mongoose.model("Good",GoodsSchema)
