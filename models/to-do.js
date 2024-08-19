let client = require("../dbConnection");
let collection = client.db().collection("to-do");

function postTask(task, callback) {
  collection.insertOne(task, callback);
}

function getList(callback) {
  collection.find({}).toArray(callback);
}

module.exports = { postTask, getList };
