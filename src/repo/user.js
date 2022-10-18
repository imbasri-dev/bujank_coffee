const postgresDb = require("../config/postgre");
const bcrypt = require("bcrypt"); //import hash
const get = () => {
    return new Promise((resolve, reject) => {
        let query = `select * from users order by id asc`;
        // paginasi biasanya diwakili dengan query dan limit
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

const register = (body) => {
    return new Promise((resolve, reject) => {
        let query = `insert into users (email, password, phone_number) values ($1, $2, $3) returning id, email`;
        const { email, password, phone_number } = body;
        // Hash Password
        bcrypt.hash(password, 10, (err, hashedPasswords) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            postgresDb.query(
                query,
                [email, hashedPasswords, phone_number],
                (err, response) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    let getIDUsers = response.rows[0].id;
                    let load = {
                        email: response.rows[0].email,
                    };
                    let addIdToProfile = `insert into profiles (user_id) values (${getIDUsers})`;
                    console.log(addIdToProfile);
                    postgresDb.query(addIdToProfile, (err, queryResult) => {
                        if (err) {
                            return reject({ err });
                        }
                        resolve({ data: load.email, queryResult });
                    });
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
            bcrypt.compare(old_password, hashedPassword, (err, isSame) => {
                if (err) {
                    console.log(err);
                    return reject({ err });
                }
                if (!isSame)
                    return reject({
                        err: new Error("Old Password is Wrong!"),
                        statusCode: 403,
                    });
                bcrypt.hash(new_password, 10, (err, newHashedPassword) => {
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

// karena foreign key dengan users maka dihapus user_id di bagian profiles baru hapus di users.id ya
const deleted = (params) => {
    return new Promise((resolve, reject) => {
        let query = `delete from profiles where user_id = $1 returning user_id`;
        postgresDb.query(query, [params.user_id], (err, response) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            console.log(params.id);
            let deleteToUserId = `delete from users where id = (${params.user_id}) returning id`;
            console.log(deleteToUserId);
            postgresDb.query(deleteToUserId, (err, result) => {
                if (err) {
                    return reject({ err });
                }
                resolve(result);
            });
        });
    });
};
const userRepo = {
    get,
    getId,
    register,
    editPassword,
    deleted,
};
module.exports = userRepo;
