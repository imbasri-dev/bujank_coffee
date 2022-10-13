const express = require("express");
const userRouter = express.Router();
const {
    get,
    getId,
    create,
    editPassword,
    deleted,
} = require("../controller/user");

userRouter.get("/", get);
userRouter.get("/:id", getId);
userRouter.post("/signup", create);
userRouter.patch("/edit", editPassword);
userRouter.delete("/:id", deleted);
module.exports = userRouter;
