module.exports = function admin(req, res, next) {
    const admin = req.user.role === "ADMIN";
    if (!admin)
        return res.status(403).send("Access denied");

    next();
}