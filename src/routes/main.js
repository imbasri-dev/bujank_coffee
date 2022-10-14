const express = require("express");
// import router
const userRouter = require("./user");
const userDataRouter = require("./userdata");
const sizeRouter = require("./size");
const promoRouter = require("./promo");
const productRouter = require("./product");
const authRouter = require("./auth");

// main router
const mainRouter = express.Router();
const prefix = "/api"; //prefix

mainRouter.use(`${prefix}/user`, userRouter);
mainRouter.use(`${prefix}/profile`, userDataRouter);
mainRouter.use(`${prefix}/size`, sizeRouter);
mainRouter.use(`${prefix}/promo`, promoRouter);
mainRouter.use(`${prefix}/product`, productRouter);
mainRouter.use(`${prefix}/auth`, authRouter);

module.exports = mainRouter;
