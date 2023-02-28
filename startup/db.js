const mongoose = require('mongoose');
const winston = require('winston');
const config = require("config");

module.exports = function () {
    mongoose.set("strictQuery", true);
    mongoose.connect(config.get("db"), {
        useUnifiedTopology: true,
        replicaSet: "rs",
        useNewUrlParser: true,
    })
        .then(() => {
            winston.debug('Successfully connected to mongodb');
        });
}