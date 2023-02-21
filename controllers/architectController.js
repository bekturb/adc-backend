const {Architect, validate} = require("../models/architect")
const mongoose = require("mongoose")
const uuid = require("uuid")
const path = require("path")

class ArchitectController {
    async create(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        const {firstname, lastname, dateOfBirth, bio} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, "..", "static", fileName))

        let architect = new Architect({
            firstname, lastname, dateOfBirth, bio, image:fileName
        });

        architect = await architect.save();
        res.status(201).send(architect)
    }

    async getAll(req, res) {
        const architects = await Architect.find().sort("firstName");
        res.send(architects)
    }

    async getOne(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        let architect = await Architect.findById(req.params.id);
        if (!architect) return res.status(404).send("No architect for the given Id");

        res.send(architect)
    }

    async update(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const {firstname, lastname, dateOfBirth, bio} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, "..", "static", fileName))

        let architect = await Architect.findByIdAndUpdate(req.params.id, {
            firstname, lastname, dateOfBirth, bio, image:fileName
        },
            {new: true}
        );

        if (!architect)
            return res.status(404).send("No architect for the given Id");
        res.send(architect)
    }

    async delete(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");
        let architect = await Architect.findByIdAndRemove(req.params.id);
        if (!architect)
            return res.status(404).send("No architect for the given Id");
        res.send(architect)
    }
}

module.exports = new ArchitectController()