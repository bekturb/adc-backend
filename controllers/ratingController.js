const {Rating, validate} = require("../models/rating")
const mongoose = require("mongoose")

class RatingController {
    async create(req, res) {
        const {error} = validate(req.body);

        if (error)
            return res.status(400).send(error.details[0].message)

       let rating = new Rating({
            rate: req.body.rate
        });

        rating = await rating.save();
        res.status(201).send(rating)
    }

    async getAll(req, res) {
        const ratings = await Rating.find().sort("rate");
        res.send(ratings)
    }

    async getOne(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        let rating = await Rating.findById(req.params.id);

        if (!rating)
            return res.status(404).send("No rating for the given Id");

        res.send(rating)
    }

    async update(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        const {error} = validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);

        let rating = await Rating.findByIdAndUpdate(req.params.id, {
            rate: req.body.rate
        }, {
            new: true
        })
        if (!rating)
            return res.status(404).send("No rating for the given Id");
        res.send(rating)
    }

    async delete(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");
        let rating = await Rating.findByIdAndRemove(req.params.id);
        if (!rating)
            return res.status(404).send("No rating for the given Id");
        res.send(rating)
    }
}

module.exports = new RatingController()