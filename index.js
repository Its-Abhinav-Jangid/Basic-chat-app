import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = 8080;
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("message", { content: message, userId: socket.id });
  });
});
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
