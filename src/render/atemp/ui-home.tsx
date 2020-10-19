// import React from "react";
// import { Route, Switch } from "react-router";
// import { connect } from "react-redux";

// import { createStructuredSelector } from "reselect";

// import "../styles/flex.scss";
// import "../styles/home.scss";
// import ShareMobile from "./share-mobile";
// import ShareDesktop from "./share-desktop";
// import ShareSelectUI from "./share-select";
// import { selectIsConnectedToPeer } from "../redux/main/main.selectors";
// import MenuIcon from "@material-ui/icons/Menu";

// import { ReactComponent as DIcon } from "../assets/icon-raw.svg";
// import {
//   AppBar,
//   createStyles,
//   IconButton,
//   makeStyles,
//   Theme,
//   Toolbar,
//   Typography,
// } from "@material-ui/core";

// interface Props {
//   isConnected: boolean;
// }

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     appBar: {
//       // backgroundColor: theme
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//     },
//   })
// );

// const HomeUI = ({ isConnected }: Props) => {
//   return (
//     <div>
//       {/* <AppBar className={classes.appBar} position="static">
//         <Toolbar>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="menu"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             Dopsender - Desktop
//           </Typography>
//         </Toolbar>
//       </AppBar> */}
//       {/* // onDrop // onDragEnter // onDragOver */}
//       {!isConnected && (
//         <div className="home-p-1">
//           <DIcon
//             className={"icon"}
//             style={{
//               width: "8rem",
//               height: "8rem",
//             }}
//           />
//         </div>
//       )}
//       <div className={`${!isConnected ? "col" : "full"} home-p-2`}>
//         <Switch>
//           <Route exact path="/desktop" component={ShareDesktop} />
//           <Route exact path="/mobile" component={ShareMobile} />
//           <Route path="/" component={ShareSelectUI} />
//         </Switch>
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = createStructuredSelector({
//   isConnected: selectIsConnectedToPeer,
// });

// export default connect(mapStateToProps)(HomeUI);
export {}