// import React from "react";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
// import UiMobileConnected from "../components/ui-mobile-connected";
// import UiMobileDisconnected from "../components/ui-mobile-disconnected";

// import { selectIsConnectedToPeer } from "../redux/main/main.selectors";

// interface Props {
//   isConnected: boolean;
// }

// const ShareMobile = (props: any) => {
//   const { isConnected } = props as Props;
//   return (
//     <div className="mobile">
//       {!isConnected ? <UiMobileDisconnected /> : <UiMobileConnected />}
//     </div>
//   );
// };

// const mapStateToProps = createStructuredSelector({
//   isConnected: selectIsConnectedToPeer,
// });

// export default connect(mapStateToProps)(ShareMobile);
export {};
