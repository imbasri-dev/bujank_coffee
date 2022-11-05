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
      const hostApi = `${req.protocol}://${req.hostname}:5000`;
      const response = await productRepo.getAll(req.query, hostApi);
      sendResponse.success(res, 200, {
         result: response,
      });
   } catch (err) {
      sendResponse.error(res, 500, err.message);
   }
};
const create = async (req, res) => {
   if (req.file) {
      // req.file.filename = `/images/${req.file.filename}`; //ubah filename
      req.file.filename = `/images/${req.file.filename}`; //ubah filename
   }

   // console.log(req.file.filename);
   try {
      const response = await productRepo.create(req.body, req.file.filename);
      // response.rows[0].image = `/images/${req.file.filename}`;
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
      if (req.file) {
         req.body.image = `/images/${req.file.filename}`; //ubah filename
      }
      const response = await productRepo.edit(req.body, req.params);
      //   response.rows[0].image = `/images/${req.file.filename}`;
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
