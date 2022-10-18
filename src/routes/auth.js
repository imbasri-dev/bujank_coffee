const authRouter = require("express").Router();
const authController = require("../controller/auth.js");

// Login
authRouter.post("/", authController.login);
// Logout
// authRouter.delete("/", (req, res) => {});

module.exports = authRouter;
