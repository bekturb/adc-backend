const {Square, validate} = require("../models/squareCategory")
const mongoose = require("mongoose");

class SquareController {
    async create(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        let square = await Square.findOne({ square: req.body.square});
        if (square)
            return res.status(400).send('This square is already exists');

        square = new Square({
            square: req.body.square
        });
        square = await square.save();
        res.status(201).send(square)
    }

    async getAll(req, res) {
        const square = await Square.find().sort("square");
        res.send(square)
    }

    async getOne(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        let square = await Square.findById(req.params.id);
        if (!square) return res.status(404).send("No square for the given Id");

        res.send(square)
    }

    async update(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let square = await Square.findByIdAndUpdate(req.params.id, {
            square: req.body.square
        }, {
            new: true
        })
        if (!square)
            return res.status(404).send("No category for the given Id");
        res.send(square)
    }

    async delete(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");
        let square = await Square.findByIdAndRemove(req.params.id);
        if (!square)
            return res.status(404).send("No category for the given Id");
        res.send(square)
    }
}

module.exports = new SquareController()