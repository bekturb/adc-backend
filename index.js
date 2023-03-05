require("dotenv").config()
const config = require("config")
const express = require('express');
const app = express();
const winston = require('winston');
require("./startup/logging")();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require("./startup/prod")(app);

const port = process.env.PORT || 5000;
const server = app.listen(port, config.get("LOCAL_ADDRESS"), () => {
    winston.info(`Server started on port ${port}`);
});

module.exports = server;