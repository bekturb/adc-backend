const mongoose = require("mongoose");
const Joi = require("joi");

const ratingSchema = new mongoose.Schema({
    rate:{
        type: String,
        required: true
    }
},{timestamps: true});

const Rating = mongoose.model("Ratings", ratingSchema);
function validateRating(rating) {
    const schema = Joi.object({
        rate: Joi.string().required()
    });
    return schema.validate(rating)
}

exports.Rating = Rating;
exports.validate = validateRating;
exports.ratingSchema = ratingSchema;