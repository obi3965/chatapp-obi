var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(express.static("public"));

io.on("connection", handleSocketConnection);

server.listen(process.env.PORT || 3060, handlerServer);

function handleSocketConnection(socket) {
	console.log("A user connected");
	socket.on("disconnect", handleSocketDisconnect);
	socket.on("message", function handleChatMessage(msg){
		socket.broadcast.emit("message", msg);
	});

	socket.on("userjoin",function(msg){
		socket.broadcast.emit("userjoin", msg);
	})
}

function handleSocketDisconnect(){
	console.log("A user disconnected");
}



function handlerServer() {
	console.log(`Listening on *:${server.address().port}`);
}
