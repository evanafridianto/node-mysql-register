const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("./config/mysql");
const app = express();
const port = 8080;

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.json({ message: "Helo word" });
});

app.post("/login", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    // const sql = ;
    if (email && password) {
        db.query(
            "SELECT * FROM accounts WHERE email=? AND password =?", [email, password],
            (err, rows) => {
                if (err) throw err;
                else if (rows.length > 0) {
                    req.session.loggedin = true;
                    req.session.email = email;
                    res.end("Selamat email " + email + " berhasil log in");
                } else {
                    res.end("Kredensial anda salah!");
                }
            }
        );
    }
});
app.post("/register", (req, res) => {
    var data = {
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password,
    };
    db.query("INSERT INTO accounts SET?", data, (err, result) => {
        if (err) throw err;
        else {
            res.send("Selamat, berhasil register dengan email" + data.email);
            console.log(result);
        }
    });
});
app.post("/logout", (req, res) => {
    if (req.session.loggedin) {
        req.session.loggedin = false;
    }
    res.send("Berhasil Log out");
});

app.listen(port, () => {
    console.log("Server di " + port);
});