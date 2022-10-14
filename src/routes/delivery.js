const express = require("express");
const deliveryRouter = express.Router();
const { get, create, edit, deleted } = require("../controller/delivery");

deliveryRouter.get("/", get);
deliveryRouter.post("/add", create);
deliveryRouter.patch("/:id", edit);
deliveryRouter.delete("/:id", deleted);

module.exports = deliveryRouter;
