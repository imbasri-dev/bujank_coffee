const express = require("express");
// import router
const userRouter = require("./user");
const userDataRouter = require("./userdata");
const authRouter = require("./auth");

// main router
const mainRouter = express.Router();
const prefix = "/api"; //prefix

mainRouter.use(`${prefix}/user`, userRouter);
mainRouter.use(`${prefix}/user/data`, userDataRouter);
mainRouter.use(`${prefix}/auth`, authRouter);
// hubungkan subrouter
// mainRouter.get(`${prefix}`, (req, res) => {
//     res.json({
//         msg: "Welcome! Bujank Coffee",
//     });
// });

module.exports = mainRouter;
