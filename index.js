const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "SecretKey";

app.get("/", (req, res) => {
    res.json({
        message: "a simple api"
    })
})

app.post("/login", (req, res) => {
    const user = {
        id: 1,
        username: "Backend",
        email: "backend@gmail.com"
    }
    jwt.sign({ user }, secretKey, { expiresIn: "500s" }, (err, token) => {
        res.json({
            token
        })
    })
})
app.listen(5001, () => {
    console.log("App is running on port 5001");
})