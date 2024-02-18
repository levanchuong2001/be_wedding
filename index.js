const express = require("express");
const cors = require("cors");
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
    useNewUrlParser: true,
  }
);

const url =
  "mongodb+srv://trumle2k1:z3cqaIhfuWMPAoIX@cluster0.e4mqe6j.mongodb.net";
const mongodbOptions = {};
const dbClient = new MongoClient(url, mongodbOptions);
const dbName = "wedding";

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
    const db = client.db(dbName);
    const collection = db.collection("message");
    await collection.insertOne(req.body);
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: "ERROR" });
  } finally {
    await dbClient.close();
  }
});

app.get("/message", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("message");
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "ERROR" });
  } finally {
    await dbClient.close();
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
