const postgresDb = require("../config/postgre");

const get = () => {
   return new Promise((resolve, reject) => {
      const query =
         "select tr.id,u.email,pf.displayname,pr.name,d.method,method_payment,qty,tax,p.code,p.discount,total,tr.create_at,tr.update_at from transactions tr left join users u on u.id = tr.user_id left join products pr on tr.product_id = pr.id left join promos p on tr.promo_id = p.id left join delivery d on tr.delivery_id = d.id left join profiles pf on pf.user_id = u.id order by tr.id asc";
      postgresDb.query(query, (err, result) => {
         if (err) {
            return reject(err);
         }
         return resolve(result);
      });
   });
};
const historyUser = (token, queryParams) => {
   return new Promise((resolve, reject) => {
      let query = `select tr.id,u.email,pr.name,pr.image,pr.price,tr.status,tr.total from transactions tr inner join users u on tr.user_id = u.id inner join products pr on tr.product_id = pr.id inner join profiles pf on u.id = pf.user_id  where u.id = $1`;

      let queryLimit = "";
      let link = `http://localhost:5000/api/transaction/history?`;

      let values = [token];
      if (queryParams.page && queryParams.limit) {
         let page = parseInt(queryParams.page);
         let limit = parseInt(queryParams.limit);
         let offset = (page - 1) * limit;
         queryLimit = query + ` limit $2 offset $3`;
         values.push(limit, offset);
      } else {
         queryLimit = query;
      }
      postgresDb.query(query, [token], (err, result) => {
         postgresDb.query(queryLimit, values, (err, queryresult) => {
            if (err) {
               console.log(err);
               return reject(err);
            }
            // console.log(queryresult);
            // console.log(queryLimit);
            if (queryresult.rows.length == 0)
               return reject(new Error("Product Not Found"));
            let resNext = null;
            let resPrev = null;
            if (queryParams.page && queryParams.limit) {
               let page = parseInt(queryParams.page);
               let limit = parseInt(queryParams.limit);
               let start = (page - 1) * limit;
               let end = page * limit;
               let next = "";
               let prev = "";
               const dataNext = Math.ceil(result.rowCount / limit);
               if (start <= result.rowCount) {
                  next = page + 1;
               }
               if (end > 0) {
                  prev = page - 1;
               }
               if (parseInt(next) <= parseInt(dataNext)) {
                  resNext = `${link}page=${next}&limit=${limit}`;
               }
               if (parseInt(prev) !== 0) {
                  resPrev = `${link}page=${prev}&limit=${limit}`;
               }
               let sendResponse = {
                  dataCount: result.rowCount,
                  next: resNext,
                  prev: resPrev,
                  totalPage: Math.ceil(result.rowCount / limit),
                  data: queryresult.rows,
               };
               return resolve(sendResponse);
            }
            let sendResponse = {
               dataCount: result.rowCount,
               next: resNext,
               prev: resPrev,
               totalPage: null,
               data: queryresult.rows,
               cek: console.log(result),
            };
            return resolve(sendResponse);
         });
      });

      // postgresDb.query(query, [token], (err, result) => {
      //     if (err) {
      //         return reject(err);
      //     }
      //     return resolve(result);
      // });
   });
};

const create = (body, token) => {
   return new Promise((resolve, reject) => {
      const {
         // user_id,
         product_id,
         promo_id,
         delivery_id,
         method_payment,
         qty,
         tax,
         total,
         status,
      } = body;
      const query =
         "insert into transactions (user_id,product_id,promo_id,delivery_id,method_payment,qty,tax,total,status) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *";
      postgresDb.query(
         query,
         [
            token,
            product_id,
            promo_id,
            delivery_id,
            method_payment,
            qty,
            tax,
            total,
            status,
         ],
         (err, queryResult) => {
            if (err) {
               console.log(err);
               return reject(err);
            }
            resolve(queryResult);
         }
      );
   });
};

const edit = (body, params) => {
   return new Promise((resolve, reject) => {
      let query = "update transactions set ";
      const values = [];
      Object.keys(body).forEach((key, idx, array) => {
         if (idx === array.length - 1) {
            query += `${key} = $${idx + 1} where id = $${idx + 2} returning *`;
            values.push(body[key], params.id);
            return;
         }
         query += `${key} = $${idx + 1},`;
         values.push(body[key]);
      });
      postgresDb
         .query(query, values)
         .then((response) => {
            resolve(response);
         })
         .catch((err) => {
            console.log(err);
            reject(err);
         });
   });
};

const deleted = (params) => {
   return new Promise((resolve, reject) => {
      const query = "delete from transactions where id = $1 returning id";
      postgresDb.query(query, [params.id], (err, queryResult) => {
         if (err) {
            console.log(err);
            return reject(err);
         }
         return resolve(queryResult);
      });
   });
};

const transactionRepo = {
   get,
   historyUser,
   create,
   edit,
   deleted,
};
module.exports = transactionRepo;
