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

app.post("/profile",verirfyToken,(req, res)=>{
    jwt.verify(req.token, secretKey,(err, authData) => {
        if(err) {
            res.send({
                result: "invalid token"
            })
        } else {
            res.json({
                message:"Profile accessed successfully",
                authData
            })
        }
    });
    next()
})

function verirfyToken(req,res,next) {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) { 
        return res.status(403).send({ result: "Token is not provided!" });
    }
    
    if(typeof bearerHeader !== undefined) {
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
      req.token = token;
      next();
    } else {
        res.send({
            result: "Token is not valid!"
        })
    }
}
app.listen(5001, () => {
    console.log("App is running on port 5001");
})