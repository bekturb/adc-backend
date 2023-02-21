const {Project, validate} = require("../models/project")
const {Architect} = require("../models/architect")
const {Rating} = require("../models/rating")
const {Category} = require("../models/category")
const {Type} = require("../models/type")
const mongoose = require("mongoose")
const uuid = require("uuid");
const path = require("path");

class CategoryController {
    async create(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        let project = await Project.findOne({
            name: req.body.name,
        });

        if (project)
            return res.status(400).send('This project is already exists');

        const architect = await Architect.findById(req.body.architectId)
        if (!architect)
            return res.status(400).send("Not found architect");

        const rating = await Rating.findById(req.body.ratingId)
        if (!rating)
            return res.status(400).send("Not found rating");

        const category = await Category.findById(req.body.categoryId)
        if (!category)
            return res.status(400).send("Not found category");

        const type = await Type.findById(req.body.typeId)
        if (!type)
            return res.status(400).send("Not found type");

        const {image} = req.files
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, "..", "static", fileName))

        project = new Project({
            name: req.body.name,
            image: fileName,
            architect: {
                _id: architect._id,
                firstName: architect.firstName
            },
            rating: {
                _id: rating._id,
                rate: rating.rate
            },
            category: {
                _id: category._id,
                name: category.name
            },
            type: {
                _id: type._id,
                name: type.typeOf
            },
        });

        project = await project.save();
        res.status(201).send(project)
    }

    async getAll(req, res) {
        const projects = await Project.find().sort("name");
        res.send(projects)
    }

    async getOne(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        let project = await Project.findById(req.params.id);
        if (!project) return res.status(404).send("No project for the given Id");

        res.send(project)
    }

    async update(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let project = await Project.findOne({
            name: req.body.name,
        });

        if (project)
            return res.status(400).send('This project is already exists');

        const architect = await Architect.findById(req.body.architectId)
        if (!architect)
            return res.status(400).send("Not found architect");

        const rating = await Rating.findById(req.body.ratingId)
        if (!rating)
            return res.status(400).send("Not found rating");

        const category = await Category.findById(req.body.categoryId)
        if (!category)
            return res.status(400).send("Not found category");

        const type = await Type.findById(req.body.typeId)
        if (!type)
            return res.status(400).send("Not found type");

        const {image} = req.files
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, "..", "static", fileName))

        project = await Project.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            image: fileName,
            architect: {
                _id: architect._id,
                firstName: architect.firstName
            },
            rating: {
                _id: rating._id,
                rate: rating.rate
            },
            category: {
                _id: category._id,
                name: category.name
            },
            type: {
                _id: type._id,
                name: type.typeOf
            },
        }, {
            new: true
        })

        if (!project)
            return res.status(404).send("No project for the given Id");

        res.send(project)
    }

    async delete(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");
        let project = await Project.findByIdAndRemove(req.params.id);
        if (!project)
            return res.status(404).send("No project for the given Id");
        res.send(project)
    }
}

module.exports = new CategoryController()