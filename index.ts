const fs = require("fs");
const pg = require("pg");
const url = require("url");

const config = {
    user: process.env["DATABASE_USER"],
    password: process.env["DATABASE_PASSWORD"],
    host: process.env["DATABASE_HOST"],
    port: 27978,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
    },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err) throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err) throw err;

        console.log(result.rows[0].version);
        client.end(function (err) {
            if (err) throw err;
        });
    });
});
