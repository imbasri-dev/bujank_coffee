const express = require("express");
const profileRouter = express.Router();
// middleware;
const isLogin = require("../middleware/isLogin");
const allowedRole = require("../middleware/allowRole");
let imageUpload = require("../middleware/upload");

const {
    getDataUserId,
    editProfile,
    deleted,
} = require("../controller/profile");

profileRouter.get(
    "/id",
    isLogin(),
    allowedRole("user", "admin"),
    getDataUserId
);
profileRouter.patch(
    "/edit",
    isLogin(),
    allowedRole("user"),
    imageUpload.single("image"),
    editProfile
);
profileRouter.delete("/:user_id", deleted);
module.exports = profileRouter;
