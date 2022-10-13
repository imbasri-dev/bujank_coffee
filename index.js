const express = require("express");
const morgan = require("morgan");
// importdb
const postgresDb = require("./src/config/postgre");

// import mainRouter
const mainRouter = require("./src/routes/main");

// init express application
const server = express();
const PORT = 5000;

postgresDb
    .connect()
    .then(() => {
        console.log("Server Connected...!");
        // pasang parser untuk body
        server.use(express.json());
        server.use(express.urlencoded({ extended: false }));
        // user router mainRouter
        server.use(
            morgan(
                ":method :url :status :res[content-length] - :response-time ms"
            )
        );
        server.use(mainRouter);
        // server ready menerima request di port
        server.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
