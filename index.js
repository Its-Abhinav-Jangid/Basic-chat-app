import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "joinChat.html"));
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("message", (data) => {
    const { room, message } = data;
    io.to(room).emit("message", {
      content: message.content,
      userId: socket.id,
      username: message.username,
    });
  });
});
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
