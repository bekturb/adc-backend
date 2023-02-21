const mongoose = require("mongoose");
const Joi = require("joi");
const {projectsSchema} = require("./projects");

const projectInfoSchema = new mongoose.Schema({
    project: {
        type: projectsSchema,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{timestamps: true});

const ProjectInfo = mongoose.model("ProjectsInfo", projectsSchema);

function validateProjectInfo(projectInfo) {
    const schema = Joi.object({
        projectId: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
    });
    return schema.validate(projectInfo)
}

exports.ProjectInfo = ProjectInfo;
exports.validate = validateProjectInfo;
exports.projectInfoSchema = projectInfoSchema;