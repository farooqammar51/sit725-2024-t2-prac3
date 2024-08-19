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
  collection.postTask(task, (err, result) => {
    if (!err) {
      res.json({
        statusCode: 201,
        data: result,
        messgae: "success",
      });
    }
  });
};

module.exports = { postList, getList };
