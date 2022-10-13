const express = require("express");
const userdataRouter = express.Router();
const {
    getDataUserId,
    editProfile,
    deleted,
} = require("../controller/userdata");

userdataRouter.get("/", getDataUserId);
userdataRouter.patch("/:user_id", editProfile);
userdataRouter.delete("/:user_id", deleted);
module.exports = userdataRouter;
