const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const keychain = require("./src/utils/keychain");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import routes

const yggdrasilRouter = require("./src/routers/yggdrasil");
const userRouter = require("./src/routers/user");
const textureRouter = require("./src/routers/texture");

// Connection

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => {
    console.log("Connected to the DB");
  }
);

// CORS

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
  next();
});

// Static

app.use(express.static("images"));

// Routers

app.use("/", yggdrasilRouter);
app.use("/api/user", userRouter);
app.use("/api/texture", textureRouter);

// Other

app.all("*", (req, res) =>
  res.status(404).json({
    error: "Not Found",
    errorMessage: "The server has not found anything matching the request URI"
  })
);

// Reading Keys

const privateKey = fs.readFileSync("keys/private.key", "utf8");
const publicKey = fs.readFileSync("keys/public.key", "utf8");

keychain.store("private", privateKey);
keychain.store("public", publicKey);

// Listen

const PORT = process.env.PORT || 3020;

app.listen(PORT, () => {
  console.log(`Server is started on ${PORT}`);
});
