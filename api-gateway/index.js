//index.js
require("dotenv-safe").config("./.env");
let http = require("http");
const express = require("express");
const httpProxy = require("express-http-proxy");
const app = express();
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const moviesServiceProxy = httpProxy("http://localhost:3000");
const cinemaCatalogServiceProxy = httpProxy("http://localhost:3001");



app.post("/login", (req, res, next) => {
  if (req.body.user === "roberto" && req.body.pwd === "123") {
    //auth ok
    const id = 1; //esse id viria do banco de dados
    var token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300, // expires in 5min
    });

    res.status(200).send({ auth: true, token: token });
  }

  res.status(500).send("Login inválido!");
});

app.get("/logout", function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

function verifyJWT(req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;
    next();
  });
}

//Proxy Request
app.get("/movies", verifyJWT, (req, res, next) => {
  moviesServiceProxy(req, res, next);
});

app.get("/cities", verifyJWT, (req, res, next) => {
  cinemaCatalogServiceProxy(req, res, next);
});

app.get("/cities/:id/movies", verifyJWT,
 (req, res, next) => {
  cinemaCatalogServiceProxy(req, res, next);
});



let server = http.createServer(app);
server.listen(3002);
