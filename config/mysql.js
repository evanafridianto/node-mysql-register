var mysql = require("mysql");

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node-mysql",
    multipleStatements: true,
});

db.connect((err) => {
    if (err) throw err;

    console.log("Koneksi berhasil");
});

module.exports = db;