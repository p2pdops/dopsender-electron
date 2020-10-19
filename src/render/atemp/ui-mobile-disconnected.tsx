// import React, { useState } from "react";
// import { QRCode } from "react-qrcode-logo";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { createStructuredSelector } from "reselect";

// import { selectMyIP } from "../redux/main/main.selectors";
// import { emitToSocket } from "../redux/network/network.reducer";

// const UIMobileDisConnected = ({ myIp, emit }: any) => {
//   const [text, setText] = useState("");

//   return (
//     <div className="App">
//       <header className="App-header">
//         <QRCode value={myIp} />
//         <p>
//           Scan this <b>QR Code</b> with Dopsender app in your mobile.
//         </p>
//       </header>
//       <div>
//         <input
//           onChange={(e) => setText(e.target.value)}
//           type="text"
//           value={text}
//         />
//         <button onClick={() => emit({ event: "sendEvent", data: text })}>
//           Send
//         </button>
//       </div>
//       Mobile
//       <Link to="/">Home</Link>
//     </div>
//   );
// };

// const mapStateToProps = createStructuredSelector({
//   myIp: selectMyIP,
// });

// const mapDispatchToProps = {
//   emit: emitToSocket,
// };

// export default connect(mapStateToProps,mapDispatchToProps)(UIMobileDisConnected);
export {};
