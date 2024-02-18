const express = require("express");
const cors = require("cors");
const fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://trumle2k1:z3cqaIhfuWMPAoIX@cluster0.e4mqe6j.mongodb.net/",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.post("/", async (req, res) => {
  try {
    await client.connect();
    await client
      .db("wedding")
      .collection("message")
      .insertOne(req.body, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });
  } finally {
    await client.close();
  }
  res.status(200).json({ message: "OK" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
