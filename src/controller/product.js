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
   // console.log(req.file);
   console.log(req.body);
   console.log(req.file);
   try {
      if (req.file) {
         // req.file.filename = `/images/${req.file.filename}`; //ubah filename
         var image = `/${req.file.public_id}.${req.file.format}`; //ubah filename
      }
      const response = await productRepo.create(req.body, req.file.url);
      // response.rows[0].image = `/images/${req.file.filename}`;
      // console.log(req.file);
      sendResponse.success(res, 201, {
         result: {
            msg: (response.text = "Product created successfully."),
            data: response.rows,
            filename: image,
            url: req.file.url,
         },
      });
   } catch (err) {
      console.log(err);
      sendResponse.error(res, 500, "Internal Server Error");
   }
};

const edit = async (req, res) => {
   try {
      // if (req.file) {
      //    req.body.image = `/images/${req.file.filename}`; //ubah filename
      // }
      // console.log(req.file);
      console.log(req.body);

      if (req.file) {
         // req.file.filename = `/images/${req.file.filename}`; //ubah filename
         var image = `/${req.file.public_id}.${req.file.format}`; //ubah filename
         var url = req.file.url; //ubah filename
      }
      const response = await productRepo.edit(
         req.body,
         req.params,
         (req.body.image = req.file.url)
      );
      console.log(req.body);

      sendResponse.success(res, 201, {
         result: {
            msg: (response.text = "Product has ben changed"),
            data: response.rows,
            filename: image,
            url,
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
