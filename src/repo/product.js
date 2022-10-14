const postgresDb = require("../config/postgre");
const get = () => {
    return new Promise((resolve, reject) => {
        const query =
            "select products.id,products.category_id,categories.category_name,products.* from products left join categories on products.category_id = categories.id order by products.id asc";
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
        const { category_id, product_name, price, stok, image, description } =
            body;
        const query =
            "insert into products (category_id,product_name,price,stok,image,description) values ($1,$2,$3,$4,$5,$6) returning *";
        postgresDb.query(
            query,
            [category_id, product_name, price, stok, image, description],
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
        let query = "update products set ";
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
        const query = "delete from products where id = $1 returning id";
        postgresDb.query(query, [params.id], (err, queryResult) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(queryResult);
        });
    });
};

const productRepo = {
    get,
    create,
    edit,
    deleted,
};
module.exports = productRepo;
