const mongoose = require("mongoose")
const winston = require("winston")
const {User, validate} = require("../models/user")
const {Favorite} = require("../models/favorite");
const bcrypt  = require("bcrypt");
const _ = require("lodash");

class UserController {

    async getMe(req, res) {
        const user = await User.findById(req.user._id).select("-password");
        res.send(user);
    }
    async create(req, res) {

        const session = await mongoose.startSession();
        session.startTransaction();
        try{
            const { error } = validate(req.body);
            if (error)
                return res.status(400).send(error.details[0].message)

            let user = await User.findOne({ email: req.body.email });
            if (user)
                return res.status(400).send('This email is already exists');

            user = new User(_.pick(req.body, ["firstName","lastName","email","password","role"]));
            const salt = await bcrypt.genSalt(5);
            user.password = await bcrypt.hash(user.password, salt)
            let favorite = await Favorite.findOne({ userId: user._id });
            if (favorite)
                return res.status(400).send('This user\' favorite is already exists');

            favorite = new Favorite({
                userId: user._id
            });

            await favorite.save();

            user = await user.save();

            res.status(201).send(_.pick(user, ["_id","firstName","lastName","email"]));

            await session.commitTransaction();
        }
        catch (err){
            await session.abortTransaction();
            winston.error(err.message);
            throw err;
        }finally {
            session.endSession();
        }
    }

    async getAll(req, res) {
        const users = await User.find()
            .sort("firstName")
            .select({password: 0})
        res.send(users)
    }
}

module.exports = new UserController()