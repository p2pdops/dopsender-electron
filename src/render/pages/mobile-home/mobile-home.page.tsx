import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ReactComponent as DIcon } from "../../assets/icon-raw.svg";
import MobileConnected from "../../containers/mobile-connected/mobile-connected.container";
import MobileDisconnected from "../../containers/mobile-disconnected/mobile-disconnected.container";
import { selectIsConnectedToPeer } from "../../redux/main/main.selectors";

import "./mobile-home.styles.scss";

interface Props {
  isConnected: boolean;
}

const _HomeMobile = ({ isConnected }: Props) => {
  return (
    <div className="mobile-home">
      {!isConnected ? <MobileDisconnected /> : <MobileConnected />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector<null, Props>({
  isConnected: selectIsConnectedToPeer,
});

const mapDispatchToProps = {};

const HomeMobile = connect(mapStateToProps, mapDispatchToProps)(_HomeMobile);
export default HomeMobile;
