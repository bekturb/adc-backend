const config = require("config")
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.set("strictQuery", true);
    mongoose.connect(config.get("db"), {
        useUnifiedTopology: true,
    })
        .then(() => {
            winston.debug('Successfully connected to mongodb');
        });
}