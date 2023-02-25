const express = require("express");
const errorMiddleware = require("../middlewares/error")
const cors = require("cors");
const path = require("path")
const fileUpload = require("express-fileupload");
const typesRoute = require("../routes/types")
const userRoute = require("../routes/users")
const categoryRoute = require("../routes/categories")
const ratingRoute = require("../routes/ratings")
const architectRoute = require("../routes/architects")
const projectRoute = require("../routes/projects")
const roomRoute = require("../routes/rooms")
const projectInfoRoute = require("../routes/projectInfos")

module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.static("static"))
    app.use(fileUpload({}));
    app.use('/api/users', userRoute);
    app.use('/api/types', typesRoute);
    app.use('/api/categories', categoryRoute);
    app.use('/api/ratings', ratingRoute);
    app.use('/api/architects', architectRoute);
    app.use('/api/projects', projectRoute);
    app.use('/api/rooms', roomRoute);
    app.use('/api/project-info', projectInfoRoute);
    app.use(errorMiddleware);
}