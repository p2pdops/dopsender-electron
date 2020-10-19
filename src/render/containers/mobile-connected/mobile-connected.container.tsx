import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectMyIP } from "../../redux/main/main.selectors";
import TransferList from "../transfer-list/transfer-list.component";
import { extractFilesFromEvent } from "../../utils/all_utils";

import "./mobile-connected.styles.scss";
import DragDropBox from "../../components/drag-drop/drag-drop.component";

interface Props {
  myIp: string;
}

const _MobileConnected = ({ myIp }: Props) => {
  const [toggleDDrop, setTDDrop] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    const files = extractFilesFromEvent(e);
    console.log("onDrop", files);
    setTDDrop(false);
  };

  const handleDrag = (e: React.DragEvent<HTMLElement>) => {
    console.log("handleDrag");

    e.preventDefault();
    return false;
  };

  const handleDragChange = (show: boolean) => (
    e: React.DragEvent<HTMLElement>
  ) => {
    console.log("handleDragChange");
    e.preventDefault();
    setTDDrop(show);
  };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDrag}
      onDragEnter={handleDragChange(true)}
      onDragLeave={handleDragChange(false)}
      className={"mobile-connected"}
    >
      {toggleDDrop ? (
        <DragDropBox />
      ) : (
        <div className="transfer-list">
          <TransferList />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector<null, Props>({
  myIp: selectMyIP,
});

const mapDispatchToProps = {};

const MobileConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MobileConnected);

export default MobileConnected;
