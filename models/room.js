const mongoose = require("mongoose");
const Joi = require("joi");

const roomSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: [true, 'Please add quantity of room '],
    },
},{timestamps: true});

function validateRoom(room) {
    const schema = Joi.object({
        quantity: Joi.number().required()
    });
    return schema.validate(room)
}

const Room = mongoose.model("Room", roomSchema);

exports.Room = Room;
exports.validate = validateRoom;
exports.roomSchema = roomSchema;