const express = require("express");
const errorMiddleware = require("../middlewares/error")
const cors = require("cors");
const fileUpload = require("express-fileupload");
const typeRoute = require("../routes/types")
const userRoute = require("../routes/users")
const categoryRoute = require("../routes/categories")
const ratingRoute = require("../routes/ratings")
const architectRoute = require("../routes/architects")

module.exports = function (app) {
    app.use(cors())
    app.use(express.json());
    app.use(fileUpload({}))
    app.use('/api/users', userRoute);
    app.use('/api/types', typeRoute);
    app.use('/api/categories', categoryRoute);
    app.use('/api/ratings', ratingRoute);
    app.use('/api/architects', architectRoute);
    app.use(errorMiddleware);
}