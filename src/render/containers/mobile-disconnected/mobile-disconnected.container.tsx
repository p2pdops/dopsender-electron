import React from "react";
import { QRCode } from "react-qrcode-logo";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectMyIP } from "../../redux/main/main.selectors";

import "./mobile-disconnected.styles.scss";

interface Props {
  myIp: string;
}

const _MobileDisconnected = ({ myIp }: Props) => {
  console.log(myIp);
  return (
    <div className={"mobile-disconnected"}>
      <div className={"center u-m-t-small u-m-b-small"}>
        {myIp && (
          <div className="qr-container">
            <QRCode
              // qrStyle={"dots"}
              ecLevel={"Q"}
              fgColor={"rgb(33, 150, 243, 0.85)"}
              enableCORS
              // bgColor={"#777"}
              value={myIp}
            />
          </div>
        )}
      </div>
      <header>
        <h2>To connect mobile :</h2>

        <ul>
          <li>
            <b>PC/Laptop, Mobile connected to same WiFi</b>
          </li>
          <ol>
            <li>Open Dopsender in your mobile.</li>
            <li>In bottom bar Click on Desktop Tab.</li>
            <li>Scan the above qr and connect.</li>
          </ol>
        </ul>
        <ul>
          <li>
            <b>Laptop connected to Mobile Hotspot</b>
          </li>
          <ol>
            <li>Open Hotspot in your mobile</li>
            <li>
              Connect this device to your mobile hotspot. (Reopen Dopsender
              Desktop)
            </li>
            <li>Open Dopsender in your mobile.</li>
            <li>In bottom bar Click on Desktop Tab.</li>
            <li>Scan the above qr and connect.</li>
          </ol>
        </ul>
      </header>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<null, Props>({
  myIp: selectMyIP,
});

const mapDispatchToProps = {};

const MobileDisconnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MobileDisconnected);

export default MobileDisconnected;
