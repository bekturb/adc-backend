const {User, validate} = require("../models/user")
class UserController {
    async create(req, res) {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message)
        let category = new User({
            name: req.body.name
        });
        category = await category.save();
        res.status(201).send(category)
    }

    async getAll(req, res) {
        const categories = await User.find().sort("name");
        res.send(categories)
    }

    async getOne(req, res) {

    }

    async update(req, res) {

    }
    async delete(req, res) {

    }
}

module.exports = new UserController()