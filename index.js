var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/templates/index.html");
});

io.on("connection", socket => {
  console.log("a user connected");
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg , smsg) {
    console.log("message: " + msg , smsg );
  });
});

io.emit("some event", { for: "everyone" });

io.on("connection", function(socket) {
  socket.broadcast.emit("hi");
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg , smsg) {
    io.emit("chat message", msg , smsg);
  });
});

http.listen(3000, '0.0.0.0' , () => {
  console.log(" server listening on port: 3000");
});
