const socket = io();

let names;
let textarea = document.querySelector("#textarea");
let message_area = document.querySelector(".message-area");

do {
	names = prompt("Please enter your name");
} while (!names);

textarea.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		sendMessage(e.target.value);
	}
});

function sendMessage(message) {
	let msg = {
		user: names,
		message: message.trim(),
	};

	appendMessage(msg, "outgoing");
	textarea.value = "";
	scrollToBottom();

	// Sending the message to the server

	socket.emit("message", msg);
}

function appendMessage(msg, type) {
	let mainDiv = document.createElement("div");
	let className = type;

	mainDiv.classList.add(className, "message");

	let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

	mainDiv.innerHTML = markup;

	message_area.appendChild(mainDiv);
}

// Receive all the messages

socket.on("message", (msg) => {
	appendMessage(msg, "incoming");
	scrollToBottom();
});

function scrollToBottom() {
	message_area.scrollTop = message_area.scrollHeight;
}
