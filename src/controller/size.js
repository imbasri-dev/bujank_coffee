const sizeRepo = require("../repo/size");
const sendResponse = require("../helpers/response");

const get = async (req, res) => {
    try {
        const response = await sizeRepo.get();
        sendResponse.success(res, 202, {
            data: response.rows,
        });
    } catch (err) {
        sendResponse.error(res, 500, "Internal Server Error");
    }
};

const create = async (req, res) => {
    try {
        const response = await sizeRepo.create(req.body);
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

const edit = async (req, res) => {
    try {
        const response = await sizeRepo.edit(req.body, req.params);
        sendResponse.success(res, 201, {
            result: {
                msg: (response.text = "Size has ben changed"),
                data: response.rows,
            },
        });
    } catch (err) {
        console.log(err);
        sendResponse.error(res, 500, "Internal Server Error");
    }
};

const deleted = async (req, res) => {
    try {
        const response = await sizeRepo.deleted(req.params);
        sendResponse.success(res, 202, {
            msg: (response.text = "Size delete succesfully"),
            data: response.rows,
        });
    } catch (err) {
        sendResponse.error(res, 500, "Internal Server Error");
    }
};
const sizeController = {
    get,
    create,
    edit,
    deleted,
};
module.exports = sizeController;
