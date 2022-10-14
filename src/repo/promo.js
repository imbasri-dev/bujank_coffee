const postgresDb = require("../config/postgre");
const get = () => {
    return new Promise((resolve, reject) => {
        const query =
            "select promos.id,promos.product_id,products.product_name,promos.* from promos left join products on  products.id = promos.product_id order by promos.id asc";
        postgresDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};

const create = (body) => {
    return new Promise((resolve, reject) => {
        const { product_id, code, discount, valid } = body;
        const query =
            "insert into promos (product_id, code, discount, valid) values ($1,upper($2),$3,$4) returning code,discount,valid";
        postgresDb.query(
            query,
            [product_id, code, discount, valid],
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
        let query = "update promos set ";
        const values = [];
        Object.keys(body).forEach((key, idx, array) => {
            if (idx === array.length - 1) {
                query += `${key} = $${idx + 1} where id = $${
                    idx + 2
                } returning *`;

                values.push(body[key], params.id);
                return;
            }
            console.log([idx]);

            query += `${key} = $${idx + 1},`;
            values.push(body[key].toUpperCase());
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
        const query = "delete from promos where id = $1 returning id";
        postgresDb.query(query, [params.id], (err, queryResult) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(queryResult);
        });
    });
};

const promoRepo = {
    get,
    create,
    edit,
    deleted,
};
module.exports = promoRepo;
