const postgreDb = require("../config/postgre.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTR = require("jwt-redis").default;
const client = require("../config/redis");
// Login Authentikasi
const login = (body) => {
    return new Promise((resolve, reject) => {
        const jwtr = new JWTR(client);
        const { email, password } = body;
        // 1. Cek apakah ada email yang sama di database ?
        const getpasswordByEmailValues =
            "select id, email, password, role from users where email = $1";
        const getpasswordEmailValues = [email];
        postgreDb.query(
            getpasswordByEmailValues,
            getpasswordEmailValues,
            (err, response) => {
                if (err) {
                    console.log(err);
                    return reject({ err });
                }
                if (response.rows.length === 0)
                    return reject({
                        err: new Error("Email is WRONG!"),
                        statusCode: 401,
                    });
                // 2. Cek apakah password yang di input sama dengan di database ?
                const hashedpassword = response.rows[0].password; // <= Get password from database
                bcrypt.compare(password, hashedpassword, (err, isSame) => {
                    if (err) {
                        console.log(err);
                        return reject({ err });
                    }
                    if (!isSame)
                        return reject({
                            err: new Error("password is WRONG!"),
                            statusCode: 401,
                        });

                    // 3. Process Login => create jwt => return jwt to users
                    const payload = {
                        id: response.rows[0].id,
                        email,
                        role: response.rows[0].role,
                    };
                    jwtr.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: "5m",
                        issuer: process.env.ISSUER,
                    }).then((token) => {
                        // Token verification
                        const sendRespon = {
                            token: token,
                            email: payload.email,
                        };
                        return resolve(sendRespon);
                    });
                    // jwt.sign(
                    //     payload,
                    //     process.env.SECRET_KEY,
                    //     {
                    //         expiresIn: "5m",
                    //         issuer: process.env.ISSUER,
                    //     },
                    //     (err, token) => {
                    //         if (err) {
                    //             console.log(err);
                    //             return reject({ err });
                    //         }
                    //         return resolve({
                    //             id: payload.id,
                    //             email: payload.email,
                    //             role: payload.role,
                    //             token,
                    //         });
                    //     }
                    // );
                });
            }
        );
    });
};

const logout = (token) => {
    return new Promise((resolve, reject) => {
        const jwtr = new JWTR(client);
        jwtr.destroy(token.jti).then((res) => {
            if (!res) reject(new Error("Login First "));
            resolve("Success logout account");
        });
    });
};
const authRepo = {
    login,
    logout,
};

module.exports = authRepo;
