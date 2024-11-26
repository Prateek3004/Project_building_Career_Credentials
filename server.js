const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(
    session({
        secret: "123456",
        resave: false,
        saveUninitialized: false,
    })
);

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "newpassword",
    database: "test_db",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the MySQL database.");
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error during query:", err);
            return res.status(500).send("Internal server error.");
        }

        if (results.length > 0) {
            const user = results[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return res.status(500).send("Internal server error.");
                }

                if (isMatch) {
                    req.session.user = user;
                    res.json(user);
                } else {
                    res.status(401).send("Invalid email or password.");
                }
            });
        } else {
            res.status(401).send("Invalid email or password.");
        }
    });
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.sendStatus(200);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
