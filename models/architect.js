const mongoose = require("mongoose");
const Joi = require("joi");

const architectSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 200,
        trim: true,
    },
    lastname: {
        type: String,
        required:true,
        minLength: 3,
        maxLength: 200,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
        trim: true,
    },
    image: {
       type: String,
        trim: true,
    },
    bio: {
        type: String,
        minLength: 3,
        maxLength: 1000,
    },
},{timestamps: true});

function validateArchitect(architect) {
    const schema = Joi.object({
        firstname: Joi.string().min(3).max(200).trim().required(),
        lastname: Joi.string().min(3).max(200).trim().required(),
        dateOfBirth: Joi.date(),
        image: Joi.string().trim(),
        bio: Joi.string().min(3).max(1000),
    });
    return schema.validate(architect)
}

const Architect = mongoose.model("Architect", architectSchema);

exports.Architect = Architect;
exports.validate = validateArchitect;
exports.architectSchema = architectSchema;