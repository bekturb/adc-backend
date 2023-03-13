const mongoose = require("mongoose");
const Joi = require("joi");

const squareSchema = new mongoose.Schema({
    square: {
        type: Number,
        required: [true, 'Please add a square'],
    },
},{timestamps: true});

function validateSquare(square) {
    const schema = Joi.object({
        square: Joi.number().required()
    });
    return schema.validate(square)
}

const Square = mongoose.model("Square", squareSchema);

exports.Square = Square;
exports.validate = validateSquare();
exports.squareSchema = squareSchema;