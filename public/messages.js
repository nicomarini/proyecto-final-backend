const socket = io();

socket.on("messages", (data) => {
  const html = data
    .map((msj) => {
      return `<div>
		  <strong>[${msj.fyh}]</strong>
		  <strong><b>${msj.author.name}:</b></strong>
		  <em>${msj.text}</em>
		  </div>`;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
});

function newMessage() {
  const addMessage = {
    author: {
      name: document.getElementById("name").value,
    },
    text: document.getElementById("text").value,
  };
  socket.emit("new-message", addMessage);
}
