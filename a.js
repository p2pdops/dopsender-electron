var evilscan = require("evilscan");
var network = require("network");

network.get_active_interface((err, data) => {
  console.log(data);

  const ip_sp = data.ip_address.split(".");
  ip_sp.pop();

  var options = {
    target: `${ip_sp.join(".")}.0/24`,
    port: "80",
    status: "RO", // Timeout, Refused, Open, Unreachable
    banner: true,
  };

  var scanner = new evilscan(options);

  scanner.on("result", function (data) {
    // fired when item is matching options
    
    console.log(data);
  });

  scanner.on("error", function (err) {
    throw new Error(err.toString());
  });

  scanner.on("done", function () {
    // finished !
  });

  scanner.run();
});

// ACTIVE NETWORK
// const data = {
//   name: "eno1",
//   ip_address: "192.168.0.103",
//   mac_address: "00:d8:61:52:7c:cd",
//   gateway_ip: "192.168.0.1",
//   netmask: "255.255.255.0",
//   type: "Wired",
// };
