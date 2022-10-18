const express = require("express");
const productRouter = express.Router();
const isLogin = require("../middleware/isLogin");
const allowRole = require("../middleware/allowRole");
// const validate = require("../middleware/validate");
const uploadImage = require("../middleware/upload");
const {
    filter,
    create,
    edit,
    deleted,
    getAll,
} = require("../controller/product");

productRouter.get("/", filter);
productRouter.get("/all", getAll);
productRouter.post(
    "/add",
    isLogin(),
    allowRole("admin"),
    uploadImage.single("image"),
    create
);
productRouter.patch(
    "/:id",
    uploadImage.single("image"),
    isLogin(),
    allowRole("admin"),
    edit
);
productRouter.delete("/:id", isLogin(), allowRole("admin"), deleted);

module.exports = productRouter;
