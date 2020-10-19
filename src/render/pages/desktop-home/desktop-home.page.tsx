import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import MobileConnected from "../../containers/mobile-connected/mobile-connected.container";
import {selectIsConnectedToPeer} from "../../redux/main/main.selectors";
import DesktopDisconnected from "../../containers/desktop-disconnected/desktop-disconnected.container";
import './desktop-home.styles.scss'

interface Props {
  isConnected: boolean;
}

const _HomeDesktop = ({isConnected}: Props) => {
  return (<div className="desktop-home">
    {!isConnected ? <DesktopDisconnected/> : <MobileConnected/>}
  </div>);
};

const mapStateToProps = createStructuredSelector<null, Props>({
  isConnected: selectIsConnectedToPeer,
});

const mapDispatchToProps = {};

const HomeDesktop = connect(mapStateToProps, mapDispatchToProps)(_HomeDesktop);
export default HomeDesktop;
