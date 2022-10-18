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
    if (req.file) {
        req.body.image = req.file.path;
    }
    try {
        const response = await profileRepo.editProfile(
            req.body,
            req.userPayload.id
        );
        sendResponse.success(res, 202, {
            msg: (response.text = "Profile changed successfully"),
            data: response.rows,
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
