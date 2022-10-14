const express = require("express");
const productRouter = express.Router();
const { get, create, edit, deleted } = require("../controller/product");

productRouter.get("/", get);
productRouter.post("/add", create);
productRouter.patch("/:id", edit);
productRouter.delete("/:id", deleted);

module.exports = productRouter;
