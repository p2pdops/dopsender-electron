import React from "react";
import {createStructuredSelector} from "reselect";
import {makeStyles} from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import {DesktopWindowsRounded, HistoryRounded, InfoOutlined, PhoneAndroidRounded,} from "@material-ui/icons";
import {Button, ButtonGroup, Divider, Paper} from "@material-ui/core";
import {selectIsConnectedToPeer} from "../../redux/main/main.selectors";
import {
  selectIsReceiving,
  selectIsSending,
  selectReceiveFileName,
  selectReceiveFilePath,
  selectReceiveProgress,
  selectReceiveTimeLeft,
  selectSendFileName,
  selectSendFilePath,
  selectSendProgress,
  selectSendTimeLeft,
} from "../../redux/transfer/transfer.selectors";

import {selectFiles} from "../../redux/transfer/transfer.reducer";
import {RouteComponentProps, withRouter} from "react-router";

import {connect} from "react-redux";
import "./btm-nav.styles.scss";
import {
  TransferReceiveProgressAction,
  TransferReceivingAction,
  TransferSendingAction,
  TransferSendProgressAction,
} from "../..";
import {humanizeTimeLeft} from "../../utils/all_utils";

const {remote} = window.require("electron");
const dialog = remote.dialog;
const WIN = remote.getCurrentWindow();

const useStyles = makeStyles(({props}) => ({
  root: {
    background: " #2196f3",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  label: {
    textTransform: "capitalize",
    color: props?.MuiBottomNavigationAction?.["aria-checked"]
      ? "#ffffff"
      : "#bbdefb",
  },
}));

interface BtmNavReduxProps
  extends TransferSendingAction,
    TransferSendProgressAction,
    TransferReceivingAction,
    TransferReceiveProgressAction {
  isConnected: boolean;
}

interface Props extends BtmNavReduxProps, RouteComponentProps {
  isConnected: boolean;
  selectFiles: (files: string[]) => void;
}

const _SimpleBottomNavigation = ({
                                   history,
                                   isConnected,
                                   selectFiles,
                                   sending,
                                   sendProgress,
                                   sendFileName,
                                   sendTimeLeft,

                                   receiving,
                                   receiveProgress,
                                   receiveFileName,
                                   receiveTimeLeft,
                                 }: Props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const _selectFiles = async () => {
    let result = await dialog.showOpenDialog(WIN, {
      title: "Select files to send",
      buttonLabel: "Select",
      filters: [{name: "All Files", extensions: ["*"]}],
      properties: ["openFile", "multiSelections"],
    });

    console.log(result.filePaths);
    selectFiles(result.filePaths);
  };

  return (
    <div className={"btm-nav"}>
      {!isConnected ? (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(newValue);

            switch (newValue) {
              case 0:
                history.push("/mobile");
                break;
              case 1:
                history.push("/desktop");
                break;
              case 2:
                history.push("/recent");
                break;
              case 3:
                history.push("/about");

                break;
            }
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            className={classes.label}
            label="Mobile"
            icon={<PhoneAndroidRounded/>}
          />
          <BottomNavigationAction
            label="Desktop"
            className={classes.label}
            icon={<DesktopWindowsRounded/>}
          />
          <BottomNavigationAction
            className={classes.label}
            label="Recent"
            icon={<HistoryRounded/>}
          />
          <BottomNavigationAction
            className={classes.label}
            label="About"
            icon={<InfoOutlined/>}
          />
        </BottomNavigation>
      ) : (
        <>
          <Paper className="btm-nav-connected">
            {sending &&
            sendTimeLeft !== Infinity &&
            sendTimeLeft !== -Infinity && (
              <div className="flex-lay">
                <div className="text-lay">
                  <h3>Sending:</h3>
                  <h3>
                    <span className={"flipsV"}>{sendProgress}%</span> done
                  </h3>
                </div>
                <div className="text-lay">
                  <h4 className="fileName">File: {sendFileName}</h4>
                  <h3>|</h3>
                  <h3 className={"flipsH"}>
                    {humanizeTimeLeft(sendTimeLeft)}
                  </h3>
                </div>

                <Divider/>
              </div>
            )}
            {receiving &&
            receiveTimeLeft !== Infinity &&
            receiveTimeLeft !== -Infinity && (
              <div className="flex-lay">
                <div className="text-lay">
                  <h4>Receiving:</h4>
                  <h3>
                    <span className={"flipsV"}>{receiveProgress}%</span> done
                  </h3>
                </div>
                <div className="text-lay">
                  <h4 className="fileName">File: {receiveFileName}</h4>
                  <h3>|</h3>
                  <h3 className={"flipsH"}>
                    {humanizeTimeLeft(receiveTimeLeft)}
                  </h3>
                </div>

                <Divider/>
              </div>
            )}
            <div className="controls-lay">
              <ButtonGroup className={"btns-lay"} variant="text">
                <Button className={"disconnect"}>Disconnect</Button>
                <Button className={"select-files"} onClick={_selectFiles}>
                  Select Files
                </Button>
              </ButtonGroup>
            </div>
          </Paper>
        </>
      )}
    </div>
  );
};

const _rBNav = withRouter(_SimpleBottomNavigation);

const mapStateToProps = createStructuredSelector<null, BtmNavReduxProps>({
  isConnected: selectIsConnectedToPeer,

  sending: selectIsSending,
  sendProgress: selectSendProgress,
  sendTimeLeft: selectSendTimeLeft,
  sendFilePath: selectSendFilePath,
  sendFileName: selectSendFileName,

  receiving: selectIsReceiving,
  receiveProgress: selectReceiveProgress,
  receiveTimeLeft: selectReceiveTimeLeft,
  receiveFilePath: selectReceiveFilePath,
  receiveFileName: selectReceiveFileName,
});

const mapDispatchToProps = {
  selectFiles,
};

const SimpleBottomNavigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(_rBNav);

export default SimpleBottomNavigation;
