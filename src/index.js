var express = require("express");
//var mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

var app = express();
// mongoose.connect(
//   "mongodb+srv://farooqammar51:2Z9cPlQs8kp91l9j@cluster0.zkymg.mongodb.net/to-do_db"
// );
const uri =
  "mongodb+srv://farooqammar51:2Z9cPlQs8kp91l9j@cluster0.zkymg.mongodb.net/to-do_db";

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.port || 3000;

let collection;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function runDBConnection() {
  try {
    await client.connect();
    collection = client.db().collection("to-do");
    console.log(collection);
  } catch (ex) {
    console.log(ex);
  }
}

app.get("/api/to-do", (req, res) => {
  getList((err, result) => {
    if (!err) {
      res.json({
        statusCode: 200,
        data: result,
        messgae: "get list successful",
      });
    }
  });
});

app.post("/api/to-do", (req, res) => {
  let task = req.body;
  postTask(task, (err, result) => {
    if (!err) {
      res.json({
        statusCode: 201,
        data: result,
        messgae: "success",
      });
    }
  });
});

function postTask(task, callback) {
  collection.insertOne(task, callback);
}

function getList(callback) {
  collection.find({}).toArray(callback);
}

app.listen(port, () => {
  console.log("App listening to: http://localhost:" + port);
  runDBConnection();
});
