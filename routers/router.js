var express = require("express");
var router = express.Router();
var controller = require("../controllers/controller");

router.post("/", function (req, res) {
  controller.postList(req, res);
});

router.get("/", function (req, res) {
  controller.getList(req, res);
});

module.exports = router;
