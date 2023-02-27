const {ProjectFavorite, validate} = require("../models/projectFavorite")
const mongoose = require("mongoose");

class ProjectFavoriteController {
    async create(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        let projectFavorite = await ProjectFavorite.findOne({ projectId: req.body.projectId });
        if (projectFavorite)
            return res.status(400).send('This projectFavorite is already exists');

        projectFavorite = new ProjectFavorite({
            projectId: req.body.projectId,
            favoriteId: req.body.favoriteId
        });
        projectFavorite = await projectFavorite.save();
        res.status(201).send(projectFavorite)
    }

    async getAll(req, res) {
        const projectFavorite = await ProjectFavorite.find();
        res.send(projectFavorite)
    }

    async delete(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");
        let projectFavorite = await ProjectFavorite.findByIdAndRemove(req.params.id);
        if (!projectFavorite)
            return res.status(404).send("No category for the given Id");
        res.send(projectFavorite)
    }
}

module.exports = new ProjectFavoriteController()