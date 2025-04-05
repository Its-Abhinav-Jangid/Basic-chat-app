// Should match your server URL
const socket = io();
const input = document.getElementById("message");
const messageForm = document.getElementById("message-form");
const allMessages = document.getElementById("chat-messages");
messageForm.addEventListener("submit", handleSubmit);

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
const room = urlParams.get("room");
const chatRoomName = document.getElementById("chat-room-name");

chatRoomName.textContent = room;

joinRoom(room);

function joinRoom(room) {
  socket.emit("joinRoom", room);
}

function handleSubmit(e) {
  e.preventDefault();

  if (input.value) {
    socket.emit("message", {
      room: room,
      message: { content: input.value, username: username },
    });
    input.value = "";
  }
}
socket.on("message", (message) => {
  const newMessageElement = document.createElement("div");

  newMessageElement.innerHTML = `<div class="message-username">${
    message.username === username ? "You" : message.username
  }</div>
            <div class="message-content">${message.content}</div>`;

  newMessageElement.classList.add("message");
  newMessageElement.classList.add(
    message.userId === socket.id ? "sent" : "received"
  );
  allMessages.appendChild(newMessageElement);
  allMessages.scrollTo(0, allMessages.scrollHeight);
});
