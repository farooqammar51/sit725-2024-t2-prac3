var express = require("express");
const router = require("./routers/router");
require("./dbConnection");

var app = express();

app.use(express.static(__dirname + "/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/to-do", router);

var port = process.env.port || 3000;

// let collection;
// async function runDBConnection() {
//   try {
//     await client.connect();
//     collection = client.db().collection("to-do");
//     console.log(collection);
//   } catch (ex) {
//     console.log(ex);
//   }
// }

// app.get("/api/to-do", (req, res) => {
//   getList((err, result) => {
//     if (!err) {
//       res.json({
//         statusCode: 200,
//         data: result,
//         messgae: "get list successful",
//       });
//     }
//   });
// });

// app.post("/api/to-do", (req, res) => {
//   let task = req.body;
//   postTask(task, (err, result) => {
//     if (!err) {
//       res.json({
//         statusCode: 201,
//         data: result,
//         messgae: "success",
//       });
//     }
//   });
// });

app.listen(port, () => {
  console.log("App listening to: http://localhost:" + port);
  //runDBConnection();
});
