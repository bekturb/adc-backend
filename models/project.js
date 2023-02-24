const mongoose = require("mongoose");
const Joi = require("joi");
const { categorySchema } = require("./category");
const { architectSchema } = require("./architect");
const { ratingSchema } = require("./rating");
const { typeSchema } = require("./type");
const {roomSchema} = require("./room");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a project name'],
        minLength: 3,
        maxLength: 200,
        trim: true,
    },
    category: {
        type: categorySchema,
        required: true
    },
    type: {
        type: typeSchema,
        required: true
    },
    room: {
        type: roomSchema,
        required: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    architect: {
        type: architectSchema,
        required: true,
    },
    rating: {
        type: ratingSchema,
        required: true,
        default: 0
    },

},{timestamps: true});

function validateProject(project) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(200).trim().required(),
        image: Joi.string().trim(),
        architectId: Joi.string().required(),
        ratingId: Joi.string().required(),
        categoryId: Joi.string().required(),
        typeId: Joi.string().required(),
        roomId: Joi.string().required()
    });
    return schema.validate(project)
}

const Project = mongoose.model("Projects", projectSchema);


exports.Project = Project;
exports.validate = validateProject;
exports.projectsSchema = projectSchema;