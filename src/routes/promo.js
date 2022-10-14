const express = require("express");
const promoRouter = express.Router();
const { get, create, edit, deleted } = require("../controller/promo");

promoRouter.get("/", get);
promoRouter.post("/add", create);
promoRouter.patch("/:id", edit);
promoRouter.delete("/:id", deleted);

module.exports = promoRouter;
