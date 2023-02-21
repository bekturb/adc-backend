const mongoose = require("mongoose");
const Joi = require("joi");

const ratingSchema = new mongoose.Schema({
    rate:{
        type: Number,
        required: true,
        trim:true,
    }
},{timestamps: true});

const Rating = mongoose.model("Ratings", ratingSchema);
function validateRating(rating) {
    const schema = Joi.object({
        rate: Joi.number().required()
    });
    return schema.validate(rating)
}

exports.Rating = Rating;
exports.validate = validateRating;
exports.ratingSchema = ratingSchema;