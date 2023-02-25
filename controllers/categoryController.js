const {Category, validate} = require("../models/category")
const mongoose = require("mongoose");

class CategoryController {
    async create(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        let category = await Category.findOne({ name: req.body.name });
        if (category)
            return res.status(400).send('This category is already exists');

        category = new Category({
            name: req.body.name
        });
        category = await category.save();
        res.status(201).send(category)
    }

    async getAll(req, res) {
        const categories = await Category.find().sort("name");
        res.send(categories)
    }

    async getOne(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        let category = await Category.findById(req.params.id);
        if (!category) return res.status(404).send("No category for the given Id");

        res.send(category)
    }

    async update(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        }, {
            new: true
        })
        if (!category)
            return res.status(404).send("No category for the given Id");
        res.send(category)
    }

    async delete(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");
        let category = await Category.findByIdAndRemove(req.params.id);
        if (!category)
            return res.status(404).send("No category for the given Id");
        res.send(category)
    }
}

module.exports = new CategoryController()