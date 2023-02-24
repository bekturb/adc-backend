const {ProjectInfo, validate} = require("../models/projectInfo")
const {Project} = require("../models/project");
const mongoose = require("mongoose");

class ProjectInfoController {
    async create(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        let project = await Project.findById(req.body.projectId );
        if (!project)
            return res.status(400).send("Not found project");

        let projectInfo = new ProjectInfo({
            name: req.body.name
        });
        projectInfo = await projectInfo.save();
        res.status(201).send(projectInfo)
    }

    async getAll(req, res) {
        const categories = await ProjectInfo.find().sort("name");
        res.send(categories)
    }

    async getOne(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        let category = await ProjectInfo.findById(req.params.id);
        if (!category) return res.status(404).send("No category for the given Id");

        res.send(category)
    }

    async update(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let category = await ProjectInfo.findByIdAndUpdate(req.params.id, {
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
        let category = await ProjectInfo.findByIdAndRemove(req.params.id);
        if (!category)
            return res.status(404).send("No category for the given Id");
        res.send(category)
    }
}

module.exports = new ProjectInfoController()