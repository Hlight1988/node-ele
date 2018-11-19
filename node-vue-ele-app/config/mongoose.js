const mongoose = require('mongoose')

const config = require('./config')

module.exports = function () {
    const db = mongoose.connect(config.mongodb,{ useNewUrlParser: true } )

    require('../models/goods');
    require('../models/User');
    require('../models/Profile');

    return db;
}
