const runServers = async () => {
  const io = require("socket.io")(4042);

  io.on("connection", (socket) => {
    console.log("Server initiated");

    let address = socket.conn.remoteAddress;

    const EVENT_REQ_NEXT_FILE = "action/reqNextFile";
    const EVENT_SHARE_FILE = "action/receiveFile";
    const EVENT_ANY_ONE_THERE = "action/helloAnyOneThere";

    address = address.substring(address.lastIndexOf(":") + 1);

    console.log("connected", address);

    socket.broadcast.emit("device_connected", address);

    socket.on(EVENT_SHARE_FILE, (data) => {
      console.log(EVENT_SHARE_FILE, data);
      socket.broadcast.emit(EVENT_SHARE_FILE, data);
    });

    socket.on(EVENT_REQ_NEXT_FILE, (data) => {
      console.log(EVENT_REQ_NEXT_FILE, data);
      socket.broadcast.emit(EVENT_REQ_NEXT_FILE);
    });

    socket.on("disconnect", () => {
      console.log("disconnected", address);
      socket.broadcast.emit(EVENT_ANY_ONE_THERE, "");
      socket.broadcast.emit("device_disconnected", address);
    });
  });
};

module.exports = runServers;
