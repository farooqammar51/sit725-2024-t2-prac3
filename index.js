var express = require("express");
const router = require("./routers/router");
require("./dbConnection");

var app = express();

app.use(express.static(__dirname + "/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/to-do", router);

var port = process.env.port || 3000;

app.listen(port, () => {
  console.log("App listening to: http://localhost:" + port);
});
