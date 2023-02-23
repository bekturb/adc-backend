const mongoose = require("mongoose");
const Joi = require("joi");

const typeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required: [true, 'Please add a typeName'],
        enum:["exterior", "interior"],
        lowercase: true
    }
},{timestamps: true});
function validateType(type) {
    const schema = Joi.object({
        typeName: Joi.string().required().trim().valid("interior", "exterior")
    });
    return schema.validate(type)
}

const Type = mongoose.model("Types", typeSchema);

exports.Type = Type;
exports.validate = validateType;
exports.typeSchema = typeSchema;