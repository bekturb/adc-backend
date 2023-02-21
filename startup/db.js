const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.set("strictQuery", true);
    mongoose.connect("mongodb://localhost/adc-backend")
        .then(() => {
            winston.debug('Successfully connected to mongodb');
        });
}