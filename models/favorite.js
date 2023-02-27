const mongoose = require("mongoose");
const Joi = require("joi");

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    }
},{timestamps: true});

function validateFavorite(userId) {
    const schema = Joi.object({
        userId: Joi.string().required()
    });
    return schema.validate(userId)
}

const Favorite = mongoose.model("Favorites", favoriteSchema);

exports.Favorite = Favorite;
exports.validate = validateFavorite;
exports.favoriteSchema = favoriteSchema;