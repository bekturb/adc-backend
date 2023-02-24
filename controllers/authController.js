const {User} = require("../models/user")
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");

class AuthController {
    async create(req, res) {

        const {error} = this.validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message)

        let user = await User.findOne({email: req.body.email});
        if (!user)
            return res.status(400).send('');

        user = new User(_.pick(req.body, ["firstName", "lastName", "email", "password"]));
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt)
        user = await user.save();
        res.status(201).send(_.pick(user, ["_id", "firstName", "lastName", "email"]))
    }

    validate(req) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required(),
        });
        return schema.validate(req);
    }
}

module.exports = new AuthController()