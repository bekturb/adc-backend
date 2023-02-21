const mongoose = require("mongoose");
const Joi = require("joi");

const typeSchema = new mongoose.Schema({
    typeOf: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }
},{timestamps: true});
function validateType(type) {
    const schema = Joi.object({
        typeOf: Joi.string().required().trim()
    });
    return schema.validate(type)
}

const Type = mongoose.model("Type", typeSchema);

exports.Type = Type;
exports.validate = validateType;
exports.typeSchema = typeSchema;