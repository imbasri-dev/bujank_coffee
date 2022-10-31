const express = require("express");
// import router
const userRouter = require("./user");
const profileRouter = require("./profile");
const promoRouter = require("./promo");
const productRouter = require("./product");
const deliveryRouter = require("./delivery");
const transactionRouter = require("./transaction");
const authRouter = require("./auth");
// import middleware
const imageUpload = require("../middleware/upload");
// main router
const mainRouter = express.Router();
const prefix = "/api"; //prefix

mainRouter.use(`${prefix}/user`, userRouter);
mainRouter.use(`${prefix}/profile`, profileRouter);
mainRouter.use(`${prefix}/promos`, promoRouter);
mainRouter.use(`${prefix}/product`, productRouter);
mainRouter.use(`${prefix}/delivery`, deliveryRouter);
mainRouter.use(`${prefix}/transaction`, transactionRouter);
mainRouter.use(`${prefix}/auth`, authRouter);
// upload file umum
mainRouter.post(`/upload`, imageUpload.single("image"), (req, res) => {
   res.json({
      url: `/images/${req.file.filename}`,
   });
});

mainRouter.get(`/`, (req, res) => {
   res.json({
      msg: `Deploy Connected Success`,
   });
});

module.exports = mainRouter;
