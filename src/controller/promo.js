const promoRepo = require("../repo/promo");
const sendResponse = require("../helpers/response");

const get = async (req, res) => {
    try {
        const response = await promoRepo.get();
        sendResponse.success(res, 200, {
            data: response.rows,
        });
    } catch (err) {
        sendResponse.error(res, 500, "Internal Server Error");
    }
};

const create = async (req, res) => {
    try {
        const response = await promoRepo.create(req.body);
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
        const response = await promoRepo.edit(req.body, req.params);
        sendResponse.success(res, 201, {
            result: {
                msg: (response.text = "Promo has ben changed"),
                data: response.rows,
            },
        });
    } catch (err) {
        console.log(err);
        sendResponse.error(res, 500, err.message || "Internal Server Error");
    }
};

const deleted = async (req, res) => {
    try {
        const response = await promoRepo.deleted(req.params);
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
