const mongoose = require("mongoose");
const Joi = require("joi");
const {projectsSchema} = require("./project");
const {favoriteSchema} = require("./favorite");

const projectFavoriteSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    favoriteId: {
        type: mongoose.Types.ObjectId,
        ref: "Favorite",
        required: true,
    },
},{timestamps: true});

function validateProjectFavorite(items) {
    const schema = Joi.object({
        projectId: Joi.string().required(),
        favoriteId: Joi.string().required()
    });
    return schema.validate(items)
}

const ProjectFavorite = mongoose.model("ProjectFavorite", projectFavoriteSchema);

exports.ProjectFavorite = ProjectFavorite;
exports.validate = validateProjectFavorite;
exports.projectFavoriteSchema = projectFavoriteSchema;