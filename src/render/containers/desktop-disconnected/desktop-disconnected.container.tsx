import React, { useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectMyIP } from "../../redux/main/main.selectors";
import { connectToRemoteSocketServer } from "../../redux/network/network.reducer";

import { Button, Theme, withStyles } from "@material-ui/core";
import "./desktop-disconnected.styles.scss";

const IpInp = ({ ipChange }: { ipChange: (ip: string) => void }) => {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [p3, setP3] = useState("");
  const [p4, setP4] = useState("");

  const change = (place: number, value: string) => {
    switch (place) {
      case 1:
        setP1(value.replace(" ", ""));
        break;
      case 2:
        setP2(value.replace(" ", ""));
        break;
      case 3:
        setP3(value.replace(" ", ""));
        break;
      case 4:
        setP4(value.replace(" ", ""));
        break;
      default:
        break;
    }

    ipChange(`${p1}.${p2}.${p3}.${p4}`);
  };

  return (
    <div className={"ip"}>
      <input
        className={"ip-part"}
        onChange={(event) => change(1, event.target.value)}
        value={p1}
        type="text"
        maxLength={3}
        size={3}
      />
      .
      <input
        className={"ip-part"}
        onChange={(event) => change(2, event.target.value)}
        value={p2}
        type="text"
        maxLength={3}
        size={3}
      />
      .
      <input
        className={"ip-part"}
        onChange={(event) => change(3, event.target.value)}
        value={p3}
        type="text"
        maxLength={3}
        size={3}
      />
      .
      <input
        className={"ip-part"}
        onChange={(event) => change(4, event.target.value)}
        value={p4}
        type="text"
        maxLength={3}
        size={3}
      />
    </div>
  );
};

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    textTransform: "none",
    color: theme.palette.getContrastText("rgb(33, 150, 243)"),
    backgroundColor: "rgb(33, 150, 243)",
    "&:hover": {
      backgroundColor: "rgb(33, 150, 243)",
    },
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}))(Button);

interface StateProps {
  myIp: string;
}

interface Props extends StateProps {
  connectDesktop: (ip: string) => void;
}

const _DesktopDisconnected = ({ myIp, connectDesktop }: Props) => {
  console.log(myIp);

  const [ip, setIp] = useState("");

  return (
    <div className={"mobile-disconnected"}>
      <div className={"u-m-t-small u-m-b-small"}>
        {myIp && (
          <div className="ip-container">
            <b>Your IP address:</b>
            <p className={"ip-address"}>{myIp}</p>
            <br />
            <p>
              To connect PC | Laptop
              <br />
              <b>Enter IP address below :</b>
            </p>
            <IpInp ipChange={setIp} />
            <ColorButton
              onClick={() => {
                connectDesktop(ip);
              }}
            >
              Connect
            </ColorButton>
            <p className={"short-msg"}>
              Click <u className={"btn-text"}>here</u> to search for other
              desktops in your network.
            </p>
          </div>
        )}
      </div>
      <header>
        <h2>To connect Desktop :</h2>

        <ul>
          <li>
            <b>Other PC/Laptop must be connected to same WiFi/Modem</b>
          </li>
          <ol>
            <li>Open Dopsender Desktop in other computer.</li>
            <li>In bottom bar Click on Desktop Tab.</li>
            <li>Click Scan or enter this pc's IP and connect.</li>
          </ol>
        </ul>
      </header>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<null, StateProps>({
  myIp: selectMyIP,
});

const mapDispatchToProps = {
  connectDesktop: connectToRemoteSocketServer,
};

const DesktopDisconnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(_DesktopDisconnected);

export default DesktopDisconnected;
