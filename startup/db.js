const mongoose = require('mongoose');
const winston = require('winston');
const config = require("config");

module.exports = function () {
    mongoose.set("strictQuery", true);
    mongoose.connect(config.get("db"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        replicaSet: "rs",
    })
        .then(() => {
            winston.debug('Successfully connected to mongodb');
        });
}