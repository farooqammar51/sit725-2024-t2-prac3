var express = require("express");
const router = require("./routers/router");
require("./dbConnection");
const { Socket } = require("socket.io");
var app = express();
let http = require("http").createServer(app);

let io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  setInterval(() => {
    const progressUpdate = {
      taskId: "12345",
      progress: `${Math.floor(Math.random() * 100)}%`,
      message: "Task is in progress",
    };

    socket.emit("taskProgress", progressUpdate);
  }, 5000);
});

app.use(express.static(__dirname + "/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/to-do", router);

var port = process.env.port || 3000;

http.listen(port, () => {
  console.log("App listening to: http://localhost:" + port);
});
