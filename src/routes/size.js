const express = require("express");
const sizeRouter = express.Router();
const { get, create, edit, deleted } = require("../controller/size");

sizeRouter.get("/", get);
sizeRouter.post("/size", create);
sizeRouter.patch("/:id", edit);
sizeRouter.delete("/:id", deleted);

module.exports = sizeRouter;
