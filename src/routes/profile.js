const express = require("express");
const profileRouter = express.Router();
// middleware;
const isLogin = require("../middleware/isLogin");
const allowedRole = require("../middleware/allowRole");
const multer = require("multer");
// validasi muulter sebelum masuk kedatabase
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
   uploadFile,
   editProfile
);
profileRouter.delete("/:user_id", deleted);
module.exports = profileRouter;
