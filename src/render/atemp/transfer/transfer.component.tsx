import {
  ButtonGroup,
  Collapse,
  Grow,
  Paper,
  Slide,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableRow,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { extractFilesFromEvent } from "../../utils/all_utils";
// import TransferList from "./transfer-list.component";

import "./transfer.styles.scss";

interface Props {}

const TransferPage = (props: Props) => {
  const [toggleDDrop, setTDDrop] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    const files = extractFilesFromEvent(e);
    console.log("onDrop", files);
    setTDDrop(false);
  };

  const handleDrag = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    return false;
  };

  const handleDragChange = (show: boolean) => () => setTDDrop(show);

  // dragEnter => show
  // dragLeave => hide

  return (
    <TableContainer
      component={Paper}
      className="transfer-page"
      onDrop={handleDrop}
      onDragOver={handleDrag}
      onDragEnter={handleDragChange(true)}
      onDragLeave={handleDragChange(false)}
    >
      {toggleDDrop ? (
        <div className={`drag-drop`}></div>
      ) : (
        <div className="transfer-list"></div>
      )}
    </TableContainer>
  );
};

export default TransferPage;
