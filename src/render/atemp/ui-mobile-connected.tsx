// import React from "react";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

// import { selectFiles } from "../redux/transfer/transfer.reducer";
// import { selectFilesStack } from "../redux/transfer/transfer.selectors";

// import DragDropBox from "./drag-drop-box";

// import "../styles/flex.scss";
// import { DFile } from "..";

// interface Props {
//   filesStack: DFile[];
//   selectFiles: () => void;
// }

// const UiMobileConnected = ({ filesStack, selectFiles }: Props) => {
//   return (
//     <div className="mobile-connected">
//       <header className="App-header">{/* some header */}</header>
//       <div className="row">
//         <div className={filesStack.length > 0 ? "col" : "full"}>
//           <DragDropBox onFilesSelected={selectFiles} />
//         </div>

//         {filesStack.length > 0 ? (
//           <div className="col">
//             <ul>
//               {filesStack.map((file) => (
//                 <li>{file.path.substring(file.path.lastIndexOf("/") + 1)}</li>
//               ))}
//             </ul>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = createStructuredSelector({
//   filesStack: selectFilesStack,
// });

// const mapDispatchToProps = {
//   selectFiles: selectFiles,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UiMobileConnected);
export {}