let collection = require("../models/to-do");

const getList = (req, res) => {
  collection.getList((err, result) => {
    if (!err) {
      res.json({
        statusCode: 200,
        data: result,
        messgae: "get list successful",
      });
    }
  });
};

const postList = (req, res) => {
  let task = req.body;
  if (!task.title) {
    return res.status(400).json({
      statusCode: 400,
      message: "Task title is required",
    });
  }
  collection.postTask(task, (err, result) => {
    if (!err) {
      res.status(201).json({
        statusCode: 201,
        data: result,
        message: "Task successfully added",
      });
    }
  });
};

module.exports = { postList, getList };
