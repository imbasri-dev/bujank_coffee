const productRepo = require("../repo/product");
const sendResponse = require("../helpers/response");
const filter = async (req, res) => {
    try {
        console.log(req.query);
        const response = await productRepo.filterCategory(req.query);
        sendResponse.success(res, 200, {
            data: response.rows,
        });
    } catch (err) {
        sendResponse.error(res, 500, "Internal Server Error");
    }
};
const getAll = async (req, res) => {
    try {
        const response = await productRepo.getAll(req.query);
        sendResponse.success(res, 200, {
            data: response.rows,
        });
    } catch (err) {
        sendResponse.error(res, 500, "Internal Server Error");
    }
};
const create = async (req, res) => {
    try {
        const response = await productRepo.create(req.body, req.file.path);
        sendResponse.success(res, 201, {
            result: {
                msg: (response.text = "Product created successfully."),
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
        const response = await productRepo.edit(
            req.body,
            req.params,
            req.file.path
        );
        sendResponse.success(res, 201, {
            result: {
                msg: (response.text = "Product has ben changed"),
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
        const response = await productRepo.deleted(req.params);
        sendResponse.success(res, 202, {
            msg: (response.text = "Product delete succesfully"),
            delete: response.rows,
        });
    } catch (err) {
        sendResponse.error(res, 500, "Internal Server Error");
    }
};
const productController = {
    filter,
    getAll,
    create,
    edit,
    deleted,
};
module.exports = productController;
