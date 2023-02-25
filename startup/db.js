const mongoose = require('mongoose');
const winston = require('winston');
const config= require("config");

module.exports = function () {
    mongoose.set("strictQuery", true);
    mongoose.connect(config.get("db"), { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            winston.debug('Successfully connected to mongodb');
        });
}