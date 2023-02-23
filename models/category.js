const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a category Name'],
        enum:["architecture", "design"],
        lowercase: true
    },
},{timestamps: true});

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().required().trim().valid("architecture", "design")
    });
    return schema.validate(category)
}

const Category = mongoose.model("Category", categorySchema);

exports.Category = Category;
exports.validate = validateCategory;
exports.categorySchema = categorySchema;