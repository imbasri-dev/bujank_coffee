const userRepo = require("../repo/user");
const sendResponse = require("../helpers/response");

const get = async (req, res) => {
    try {
        const response = await userRepo.get();
        sendResponse.success(res, 200, {
            data: response.rows,
        });
    } catch (error) {
        sendResponse.error(res, 500, "Internal Server Error");
    }
};
const getId = async (req, res) => {
    try {
        const response = await userRepo.getId(req.params);
        sendResponse.success(res, 200, {
            data: response.rows,
        });
    } catch (err) {
        sendResponse.error(res, 500, "Internal Server Error");
    }
};

const create = async (req, res) => {
    try {
        const response = await userRepo.create(req.body);
        sendResponse.success(res, 201, {
            result: {
                msg: (response.text = "account created successfully."),
                data: response.rows,
            },
        });
    } catch (err) {
        console.log(err);
        sendResponse.error(res, 500, "Internal Server Error");
    }
};

const editPassword = async (req, res) => {
    try {
        const response = await userRepo.editPassword(req.body);
        sendResponse.success(res, 201, {
            result: {
                msg: (response.text = "Password has ben changed"),
                data: null,
            },
        });
    } catch (objErr) {
        const statusCode = objErr.status || 500;
        sendResponse.error(res, statusCode, {
            msg: objErr.err.message,
        });
    }
};

const deleted = async (req, res) => {
    try {
        const response = await userRepo.deleted(req.params);
        sendResponse.success(res, 202, {
            data: (response.text = "data delete succesfully"),
            status: (res.status = 202),
        });
    } catch (err) {
        sendResponse.error(res, 500, {
            msg: "Internal Server Error",
        });
    }
};
const userController = {
    get,
    getId,
    create,
    editPassword,
    deleted,
};
module.exports = userController;
