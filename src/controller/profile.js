const profileRepo = require("../repo/profile");
const sendResponse = require("../helpers/response");
const getDataUserId = async (req, res) => {
   try {
      const response = await profileRepo.getId(req.userPayload.id);
      sendResponse.success(res, 200, {
         result: response.rows,
      });
   } catch (err) {
      sendResponse.error(res, 500, "Server Internal Error");
   }
};
const editProfile = async (req, res) => {
   try {
      let url = req.file.url; //ubah filename
      let image = `/${req.file.public_id}.${req.file.format}`; //ubah filename
      if (req.file) {
         // req.file.filename = `/images/${req.file.filename}`; //ubah filename
         image;
         url;
      }
      const response = await profileRepo.editProfile(
         req.body,
         req.userPayload.id,
         (req.body.image = req.file.url)
      );
      console.log(req.body);
      response.rows[0].image = req.file.url;
      sendResponse.success(res, 202, {
         msg: (response.text = "Profile changed successfully"),
         data: response.rows,
         filename: image,
         url,
      });
   } catch (err) {
      sendResponse.error(res, 500, "Internal Server Error");
   }
};

const deleted = async (req, res) => {
   try {
      const response = await profileRepo.deleted(req.params);
      sendResponse.success(res, 202, {
         result: {
            msg: (response.text = "Profile delete succesfully"),
            delete: response.rows.id,
         },
      });
   } catch (err) {
      res.status(500).json({
         msg: "Internal Server Error",
      });
   }
};

const userController = {
   getDataUserId,
   editProfile,
   deleted,
};
module.exports = userController;
