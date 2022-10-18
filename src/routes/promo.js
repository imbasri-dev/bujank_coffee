const express = require("express");
const promoRouter = express.Router();

// middleware
const isLogin = require("../middleware/isLogin");
const allowRole = require("../middleware/allowRole");
const validate = require("../middleware/validate");
const {
    get,
    create,
    edit,
    searchPromo,
    deleted,
} = require("../controller/promo");

promoRouter.get("/", get);
promoRouter.get("/", searchPromo);
promoRouter.post("/add", isLogin(), allowRole("admin"), create);
promoRouter.patch("/:id", isLogin(), allowRole("admin"), edit);
promoRouter.delete("/:id", isLogin(), allowRole("admin"), deleted);

module.exports = promoRouter;
