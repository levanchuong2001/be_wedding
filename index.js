const express = require("express");
const cors = require("cors");
const fs = require("fs");
var bodyParser = require("body-parser");
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
console.log(fs.readFileSync("example_file.txt", "utf8"));
app.post("/", async (req, res) => {
  fs.appendFile("example_file.txt", JSON.stringify(req.body) + "\n", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("write file successfully");
      fs.readFileSync("example_file.txt", "utf8");
    }
  });
  res.status(200).json({ message: "OK" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
