const {Room, validate} = require("../models/room")
const mongoose = require("mongoose")

class RoomController {
    async create(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        let room = await Room.findOne({ quantity: req.body.quantity });
        if (room)
            return res.status(400).send('This room is already exists');

        room = new Room({
            quantity: req.body.quantity
        });
        room = await room.save();
        res.status(201).send(room)
    }

    async getAll(req, res) {
        const rooms = await Room.find().sort("quantity");
        res.send(rooms)
    }

    async getOne(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        let room = await Room.findById(req.params.id);
        if (!room) return res.status(404).send("No room for the given Id");

        res.send(room)
    }

    async update(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let room = await Room.findByIdAndUpdate(req.params.id, {
            quantity: req.body.quantity
        }, {
            new: true
        })
        if (!room)
            return res.status(404).send("No room for the given Id");
        res.send(room)
    }

    async delete(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");
        let room = await Room.findByIdAndRemove(req.params.id);
        if (!room)
            return res.status(404).send("No room for the given Id");
        res.send(room)
    }
}

module.exports = new RoomController()