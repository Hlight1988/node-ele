const express = require('express')

const router = express.Router()

const mongoose = require('mongoose')

const Good = mongoose.model('Good')

router.get('/',(req,res,next) => {

    res.send('goods')

})

router.post('/insert',(req,res,next) => {
    let rel = req.body;
    let good = new Good({
        goodId: rel.goodId,
        goodName: rel.goodName,
        goodPrice: rel.goodPrice,
        goodDec: rel.goodDec,
    })
    good.save(function(err) {
        if(err){
            res.send('error')
            return next();
        }

    })
})

router.get('/find',(req,res,next) => {

    var cond = {
        $or:[
            {goodId:1},
            {goodId:10}

        ]
    }
    let goodModel = Good.find(cond).limit(6)
    goodModel.exec((err,docs) => {
        res.json({
            msg:'0',
            result:docs
        })
    })

})

module.exports = router;
