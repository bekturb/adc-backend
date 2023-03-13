require("dotenv").config()
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.DB_HOST, {
        useUnifiedTopology: true,
    })
        .then(() => {
            winston.debug('Successfully connected to mongodb');
        });
}