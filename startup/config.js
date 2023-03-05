const config = require("config")

module.exports = function () {
    if (!config.get("jwtPrivateKey")) {
        throw new Error('Unexpected error: adc-project_jwtPrivateKey is undefined.');
    }
}