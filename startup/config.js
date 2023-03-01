require("dotenv").config()

module.exports = function () {
    if (!process.env.PRIVATEKEY) {
        throw new Error('Unexpected error: adc-project_jwtPrivateKey is undefined.');
    }
}