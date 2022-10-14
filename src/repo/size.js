const postgresDb = require("../config/postgre");

const get = () => {
    return new Promise((resolve, reject) => {
        const query = "select * from size id order by id asc";
        postgresDb.query(query, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

const create = (body) => {
    return new Promise((resolve, reject) => {
        const { size, cost } = body;

        const query =
            "insert into size (size,cost) values (upper($1),$2) returning size , cost";
        postgresDb.query(query, [size, cost], (err, queryResult) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(queryResult);
        });
    });
};

const edit = (body, params) => {
    return new Promise((resolve, reject) => {
        let query = "update size set ";
        const values = [];
        Object.keys(body).forEach((key, idx, array) => {
            if (idx === array.length - 1) {
                query += `${key} = $${idx + 1} where id = $${
                    idx + 2
                } returning size,cost`;
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
        const query = "delete from size where id = $1 returning id";
        postgresDb.query(query, [params.id], (err, queryResult) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(queryResult);
        });
    });
};

const sizeRepo = {
    get,
    create,
    edit,
    deleted,
};
module.exports = sizeRepo;
