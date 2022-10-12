const express = require("express");

// import router

// main router
const mainRouter = express.Router();

const prefix = "/api";

// hubungkan subrouter

mainRouter.get(`${prefix}`, (req, res) => {
    res.json({
        msg: "Welcome! Bujank Coffee",
    });
});

module.exports = mainRouter;
