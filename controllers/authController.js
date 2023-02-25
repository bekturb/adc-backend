const {User} = require("../models/user")
const {validate} = require("../models/auth")
const bcrypt = require("bcrypt");
const _ = require("lodash");

class AuthController {
    async create(req, res) {

        const {error} = validate(req.body)
        if (error)
            return res.status(400).send(error.details[0].message)

        const { email, password} = req.body

        let user = await User.findOne({email: email});
        if (!user)
            return res.status(400).send('User wasn\'t found');

        let comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword)
            return res.status(400).send('Password wasn\'t found');

        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send(true);
    }
}

module.exports = new AuthController()