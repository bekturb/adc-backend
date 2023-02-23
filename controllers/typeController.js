const {Type, validate} = require("../models/type")
const mongoose = require("mongoose")

class TypeController {
    async create(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let type = await Type.findOne({ typeName: req.body.typeName });
        if (type)
            return res.status(400).send('This typeName is already exists');

        type = new Type({
            typeName: req.body.typeName
        });
        type = await type.save();
        res.status(201).send(type)
    }

    async getAll(req, res) {
        const types = await Type.find().sort("typeName");
        res.send(types)
    }

    async getOne(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        let type = await Type.findById(req.params.id);
        if (!type) return res.status(404).send("No type for the given Id");

        res.send(type)
    }

    async update(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");

        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let type = await Type.findByIdAndUpdate(req.params.id, {
            typeName: req.body.typeName
        }, {
            new: true
        })
        if (!type)
            return res.status(404).send("No type for the given Id");
        res.send(type)
    }

    async delete(req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send("Invalid Id");
        let type = await Type.findByIdAndRemove(req.params.id);
        if (!type)
            return res.status(404).send("No type for the given Id");
        res.send(type)
    }
}

module.exports = new TypeController()