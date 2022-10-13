const postgresDb = require("../config/postgre");
const brycpt = require("bcrypt"); //import hash
const get = () => {
    return new Promise((resolve, reject) => {
        const query = "select * from users order by id asc";
        postgresDb.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
};

const getId = (params) => {
    return new Promise((resolve, reject) => {
        const query = "select * from users where id = $1";
        postgresDb.query(query, [params.id], (err, result) => {
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
        const { email, password, phone_number } = body;
        // validasi email tidak boleh duplikasi
        // hash Password
        brycpt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            const query =
                "insert into users (email,password,phone_number) values ($1,$2,$3) returning id , email";
            postgresDb.query(
                query,
                [email, hashedPassword, phone_number],
                (err, queryResult) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    resolve(queryResult);
                }
            );
        });
    });
};
const editPassword = (body) => {
    return new Promise((resolve, reject) => {
        const { old_password, new_password, user_id } = body;
        const getPwdQuery = "select password from users where id = $1";
        const getPwdValues = [user_id];
        postgresDb.query(getPwdQuery, getPwdValues, (err, response) => {
            if (err) {
                console.log(err);
                return reject({ err });
            }
            const hashedPassword = response.rows[0].password;
            brycpt.compare(old_password, hashedPassword, (err, isSame) => {
                if (err) {
                    console.log(err);
                    return reject({ err });
                }
                if (!isSame)
                    return reject({
                        err: new Error("Old Password is Wrong!"),
                        statusCode: 403,
                    });
                brycpt.hash(new_password, 10, (err, newHashedPassword) => {
                    if (err) {
                        console.log(err);
                        return reject({ err });
                    }
                    const editPwdQuery =
                        "update users set password = $1 where id = $2";
                    const editPwdValues = [newHashedPassword, user_id];
                    postgresDb.query(
                        editPwdQuery,
                        editPwdValues,
                        (err, response) => {
                            if (err) {
                                console.log(err);
                                return reject({ err });
                            }

                            return resolve(response);
                        }
                    );
                });
            });
        });
    });
};

const deleted = (params) => {
    return new Promise((resolve, reject) => {
        const query = "delete from users where id = $1";
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
    get,
    getId,
    create,
    editPassword,
    deleted,
};
module.exports = userRepo;
