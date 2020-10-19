import { createStructuredSelector } from "reselect";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchMyIp } from "./redux/main/main.reducer";
import { selectMyIP } from "./redux/main/main.selectors";
import { connectToSocketServer } from "./redux/network/network.reducer";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import { Redirect, Route, Switch, useLocation } from "react-router";

import SimpleBottomNavigation from "./components/btm-nav/btm-nav.component";
import HomeMobile from "./pages/mobile-home/mobile-home.page";
import HomeDesktop from "./pages/desktop-home/desktop-home.page";

import "./styles/App.scss";

const { ipcRenderer } = window.require("electron");

interface Props {
  myIp: string | null | unknown;
  fetchMyIp: () => void;
  connectToSocketServer: () => void;
}

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#ffcc00",
    },
    primary: {
      main: grey[100],
    },
    secondary: {
      main: green[500],
    },
  },
});

const App = ({ myIp, fetchMyIp, connectToSocketServer }: Props) => {
  useEffect(() => {
    fetchMyIp();
    ipcRenderer.on("Hello", (event, args) => {
      console.log("*******************Hello", event, args);
    });
    if (myIp !== null) {
      connectToSocketServer();
    }
  });

  const location = useLocation();
  console.log("App", location);
  const showBtmBar = location.search !== "?active=true";
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <TransferPage /> */}

        <Switch>
          <Route exact path="/desktop" component={HomeDesktop} />
          <Route path="/mobile" component={HomeMobile} />
          <Route exact path="/" render={() => <Redirect to="/mobile" />} />
        </Switch>
        
        {showBtmBar && <SimpleBottomNavigation />}
      </ThemeProvider>
    </>
  );
};

export default connect(
  createStructuredSelector({
    myIp: selectMyIP,
  }),
  {
    fetchMyIp,
    connectToSocketServer,
  }
)(App);
