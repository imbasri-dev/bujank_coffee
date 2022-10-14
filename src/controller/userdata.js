const userDataRepo = require("../repo/userdata");
const sendResponse = require("../helpers/response");

const getDataUserId = async (req, res) => {
    try {
        const response = await userDataRepo.getId(req.params);
        sendResponse.success(res, 200, {
            data: response.rows,
        });
    } catch (err) {
        sendResponse.error(res, 500, "Server Internal Error");
    }
};
const editProfile = async (req, res) => {
    try {
        const response = await userDataRepo.editProfile(req.body, req.params);
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
        const response = await userDataRepo.deleted(req.params);
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
