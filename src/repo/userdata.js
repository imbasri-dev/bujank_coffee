const postgresDb = require("../config/postgre");

const getId = (params) => {
    return new Promise((resolve, reject) => {
        const query = "select * from userdata where user_id = $1";
        postgresDb.query(query, [params.user_id], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};

const editProfile = (body, params) => {
    return new Promise((resolve, reject) => {
        let query = "update userdata set ";
        const values = [];
        Object.keys(body).forEach((key, idx, array) => {
            if (idx === array.length - 1) {
                query += `${key} = $${idx + 1} where userdata.user_id = $${
                    idx + 2
                }`;
                values.push(body[key], params.user_id);
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
        const query = "delete from userdata where user_id = $1";
        postgresDb.query(query, [params.id], (err, queryResult) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(queryResult);
        });
    });
};

const userRepo = {
    getId,
    editProfile,
    deleted,
};
module.exports = userRepo;
