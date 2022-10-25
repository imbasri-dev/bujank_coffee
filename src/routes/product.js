const express = require("express");
const productRouter = express.Router();
const isLogin = require("../middleware/isLogin");
const allowRole = require("../middleware/allowRole");
// const validate = require("../middleware/validate");
const multer = require("multer");
const uploadImage = require("../middleware/upload");

function uploadFile(req, res, next) {
    const upload = uploadImage.single("image");

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.json("Size image minimum 3mb");
        } else if (err) {
            // Error File format
            res.json("Format image Wrong!");
        }
        // Everything went fine.
        next();
    });
}
const {
    filter,
    create,
    edit,
    deleted,
    getAll,
} = require("../controller/product");

productRouter.get("/", filter);
productRouter.get("/all", getAll);
productRouter.post("/add", isLogin(), allowRole("admin"), uploadFile, create);
productRouter.patch("/:id", uploadFile, isLogin(), allowRole("admin"), edit);
productRouter.delete("/:id", isLogin(), allowRole("admin"), deleted);

module.exports = productRouter;
