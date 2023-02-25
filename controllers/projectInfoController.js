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
            project: {
                _id: project._id,
                name: project.name,
                image: project.image,
                architect: project.architect,
                category: project.category,
                type: project.type,
                rating: project.rating,
                room: project.room
            },
            title: req.body.title,
            description: req.body.description
        });
        projectInfo = await projectInfo.save();
        res.status(201).send(projectInfo)
    }

    async getAll(req, res) {
        const projectInfos = await ProjectInfo.find().sort("title");
        res.send(projectInfos)
    }

    async getOne(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        let projectInfo = await ProjectInfo.findById(req.params.id);
        if (!projectInfo) return res.status(404).send("No projectInfo for the given Id");

        res.send(projectInfo)
    }

    async update(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let project = await Project.findById(req.body.projectId );
        if (!project)
            return res.status(400).send("Not found project");

        let projectInfo = await ProjectInfo.findByIdAndUpdate(req.params.id, {
            project: {
                _id: project._id,
                name: project.name,
                image: project.image,
                architect: project.architect,
                category: project.category,
                type: project.type,
                rating: project.rating,
                room: project.room
            },
            title: req.body.title,
            description: req.body.description
        }, {
            new: true
        })
        if (!projectInfo)
            return res.status(404).send("No projectInfo for the given Id");
        res.send(projectInfo)
    }

    async delete(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");
        let projectInfo = await ProjectInfo.findByIdAndRemove(req.params.id);
        if (!projectInfo)
            return res.status(404).send("No projectInfo for the given Id");
        res.send(projectInfo)
    }
}

module.exports = new ProjectInfoController()