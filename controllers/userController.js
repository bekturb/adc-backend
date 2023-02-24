const {User, validate} = require("../models/user")
class UserController {
    async create(req, res) {

        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message)

        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(400).send('This email is already exists');

         user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        });
        user = await user.save();
        res.status(201).send(user)
    }

    async getAll(req, res) {
        const users = await User.find().sort("firstName");
        res.send(users)
    }
}

module.exports = new UserController()