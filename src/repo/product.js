const postgresDb = require("../config/postgre");
const filterCategory = (queryParams) => {
    return new Promise((resolve, reject) => {
        let query =
            "select pr.*,p.code,p.valid,p.discount from products pr full join promos p on pr.id = p.product_id ";
        // page
        const values = [];
        const whereParams = ["category"];
        if (whereParams.length > 0) query += "where ";
        whereParams.forEach((key) => {
            query += ` lower(${key}) like lower($${values.length + 1})`;
            values.push(String(queryParams[key]));
        });
        values.forEach((value) => console.log(typeof value));
        // limit & offset untuk pagination
        const page = Number(queryParams.page);
        const limit = Number(queryParams.limit);
        const offset = (page - 1) * limit;
        query += `limit $${values.length + 1} offset $${values.length + 2}`;
        values.push(limit, offset);
        postgresDb.query(query, values, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};

const getAll = (queryParams) => {
    return new Promise((resolve, reject) => {
        let query =
            "select pr.*,p.code,p.valid,p.discount from products pr full join promos p on pr.id = p.product_id ";
        // page
        if (queryParams.search) {
            query += `where lower(name) like lower('%${queryParams.search}%')`;
        }
        if (queryParams.category) {
            if (queryParams.search) {
                query += ` and where lower(category) like lower('${queryParams.category}')`;
            } else {
                query += ` where lower(category) like lower('${queryParams.category}')`;
            }
        }
        if (queryParams["sort"] == "cheapest") {
            query += "order by pr.price asc";
        }
        if (queryParams["sort"] == "expensive") {
            query += "order by pr.price desc";
        }
        if (queryParams["sort"] == "newest") {
            query += "order by create_at asc";
        }
        if (queryParams["sort"] == "lastest") {
            query += "order by create_at desc";
        }
        if (queryParams["sort"] == "id_asc") {
            query += "order by id asc";
        }
        if (queryParams["sort"] == "id_desc") {
            query += "order by id desc";
        }
        if (queryParams["sort"] == "favorite") {
            query =
                "select pr.*,p.code,p.valid,p.discount,tr.qty from products pr inner join promos p on pr.id = p.product_id inner join transactions tr on pr.id = tr.product_id order by tr.qty desc";
        }
        let page = Number(queryParams.page);
        let limit = Number(queryParams.limit);
        let offset = (page - 1) * limit;
        query += ` limit ${limit} offset ${offset}`;
        // page
        postgresDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};

const create = (body, file) => {
    return new Promise((resolve, reject) => {
        const { name, category, size, price, stock, description } = body;
        // const { image } = file;
        const query =
            "insert into products (name, category, size, price, stock, image, description) values ($1,upper($2),$3,$4,$5,$6,$7) returning *";
        postgresDb.query(
            query,
            [name, category, size, price, stock, file, description],
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
    getAll,
    filterCategory,
    create,
    edit,
    deleted,
};
module.exports = productRepo;
