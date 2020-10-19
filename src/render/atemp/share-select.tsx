// import {
//   AppBar,
//   Button,
//   ButtonBase,
//   Toolbar,
//   makeStyles,
//   Typography,
// } from "@material-ui/core";
// import React from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { createStructuredSelector } from "reselect";
// import desktopImg from "../assets/data-transfer-desktop.jpg";
// import mobileImg from "../assets/data-transer-to-mobile.jpg";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     minWidth: 300,
//     width: "100%",
//     height: "100%",
//   },
//   image: {
//     position: "relative",
//     height: "calc(100vh - 40px)",
//     [theme.breakpoints.down("xs")]: {
//       width: "100% !important", // Overrides inline-style
//       height: 100,
//     },
//     "&:hover, &$focusVisible": {
//       zIndex: 1,
//       "& $imageBackdrop": {
//         opacity: 0.15,
//       },
//       "& $imageMarked": {
//         opacity: 0,
//       },
//       "& $imageTitle": {
//         border: "4px solid currentColor",
//       },
//     },
//   },
//   focusVisible: {},
//   imageButton: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: theme.palette.common.white,
//   },
//   imageSrc: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundSize: "cover",
//     backgroundPosition: "center 40%",
//   },
//   imageBackdrop: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundColor: theme.palette.common.black,
//     opacity: 0.4,
//     transition: theme.transitions.create("opacity"),
//   },
//   imageTitle: {
//     position: "relative",
//     padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
//       theme.spacing(1) + 6
//     }px`,
//   },
//   imageMarked: {
//     height: 3,
//     width: 18,
//     backgroundColor: theme.palette.common.white,
//     position: "absolute",
//     bottom: -2,
//     left: "calc(50% - 9px)",
//     transition: theme.transitions.create("opacity"),
//   },
//   title: {
//     flexGrow: 1,
//   },
//   appbar: {
//     backgroundColor: "#fff",
//   },
// }));

// const ShareSelectUI = () => {
//   const classes = useStyles();

//   return (
//     <>
//       <div className="header">
//         <AppBar position="static" className={classes.appbar}>
//           <Toolbar color={"#2196f3"}>
//             <Typography variant="h6" className={classes.title}>
//               Choose device to share
//             </Typography>
//             <Button color="inherit">Login</Button>
//           </Toolbar>
//         </AppBar>
//       </div>
//       <div className="body">
//         {/* Photo by Nikita Kachanovsky */}
//         <ButtonBase
//           focusRipple
//           component={Link}
//           to="/desktop"
//           key={"desktop"}
//           className={classes.image}
//           focusVisibleClassName={classes.focusVisible}
//           style={{
//             width: "50%",
//           }}
//         >
//           <span
//             className={classes.imageSrc}
//             style={
//               {
//                 // backgroundImage: `url(${desktopImg})`,
//               }
//             }
//           />
//           <span className={classes.imageBackdrop} />
//           <span className={classes.imageButton}>
//             <Typography
//               component="span"
//               variant="subtitle1"
//               color="inherit"
//               className={classes.imageTitle}
//             >
//               DESKTOP
//               <span className={classes.imageMarked} />
//             </Typography>
//           </span>
//         </ButtonBase>

//         {/* Photo by Yash Menghani */}

//         <ButtonBase
//           focusRipple
//           component={Link}
//           to="/mobile"
//           key={"mobile"}
//           className={classes.image}
//           focusVisibleClassName={classes.focusVisible}
//           style={{
//             width: "50%",
//           }}
//         >
//           <span
//             className={classes.imageSrc}
//             // style={{ backgroundImage: `url(${mobileImg})` }}
//           />
//           <span className={classes.imageBackdrop} />
//           <span className={classes.imageButton}>
//             <Typography
//               component="span"
//               variant="subtitle1"
//               color="inherit"
//               className={classes.imageTitle}
//             >
//               MOBILE
//               <span className={classes.imageMarked} />
//             </Typography>
//           </span>
//         </ButtonBase>
//       </div>
//       <div className="footer"></div>
//     </>
//   );
// };

// const mapStateToProps = createStructuredSelector({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(ShareSelectUI);
export {};
