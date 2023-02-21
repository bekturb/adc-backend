const express = require("express");
const errorMiddleware = require("../middlewares/error")
const cors = require("cors");
const typeRoute = require("../routes/types")
const userRoute = require("../routes/users")
const categoryRoute = require("../routes/categories")

module.exports = function (app) {
    app.use(express.json());
    app.use(cors())
    app.use('/api/users', userRoute);
    app.use('/api/types', typeRoute);
    app.use('/api/categories', categoryRoute);
    app.use(errorMiddleware);
}