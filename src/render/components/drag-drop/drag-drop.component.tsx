import React, { DragEvent } from "react";

import "./drag-drop.styles.scss";

interface Props {
  //   onFilesSelected: (filesPaths: string[]) => void;
}

const DragDropBox = ({}: Props) => {
  return (
    <div className="drag-drop">
      <div>
        <h3>Drag-drop files to send</h3>
      </div>
      <div>
        <h4 className="link">Click here to Select Files</h4>
      </div>
    </div>
  );
};

export default DragDropBox;

/*
const { remote } = window.require("electron");
const dialog = remote.dialog;
const WIN = remote.getCurrentWindow();

onClick={selectFiles}

const selectFiles = async () => {
    let result = await dialog.showOpenDialog(WIN, {
      title: "Select files to send",
      buttonLabel: "Select",
      filters: [{ name: "All Files", extensions: ["*"] }],
      properties: ["openFile", "multiSelections"],
    });

    console.log(result.filePaths);
    onFilesSelected(result.filePaths);
};

*/
