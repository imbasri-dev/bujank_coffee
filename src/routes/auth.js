const authRouter = require("express").Router();
const authController = require("../controller/auth.js");
const isLogin = require("../middleware/isLogin");
// Login
authRouter.post("/", authController.login);
authRouter.delete("/", isLogin(), authController.logout);
// Logout
// authRouter.delete("/", (req, res) => {});
module.exports = authRouter;
