const express = require("express");
const profileRouter = express.Router();
// middleware;
const isLogin = require("../middleware/isLogin");
const allowedRole = require("../middleware/allowRole");

const {
    getDataUserId,
    editProfile,
    deleted,
} = require("../controller/profile");

profileRouter.get("/:user_id", isLogin(), allowedRole("user"), getDataUserId);
profileRouter.patch("/:user_id", editProfile);
profileRouter.delete("/:user_id", deleted);
module.exports = profileRouter;
