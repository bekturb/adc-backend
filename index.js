const config = require("config");
const express = require('express');
const app = express();
const winston = require('winston');
require("./startup/logging")();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require("./startup/prod")(app);

const port = config.get("port") || 5000;
const server = app.listen(port, () => {
    winston.info(`Server started on port ${port}`);
});

module.exports = server;