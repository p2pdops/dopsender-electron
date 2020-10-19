import React, { useRef } from "react";
import { List } from "@material-ui/core";
import { connect } from "react-redux";
import { DFile, DFileType, StatusType } from "../../index.d";

import TransferItem from "../../components/transfer-item/transfer-item.component";
import { createStructuredSelector } from "reselect";
import { selectFilesStack } from "../../redux/transfer/transfer.selectors";

interface Props {
  files: DFile[];
}

const f1: DFile = {
  type: DFileType.SEND_FILE,
  name: "Screenshot_20200911_084420.png",
  path: "/home/p2pdops/Desktop/Screenshot_20200911_084420.png",
  size: 186564,
  status: StatusType.DONE,
};

const f2: DFile = {
  type: DFileType.SEND_FILE,
  name: "Screenshot_20200911_084420.png",
  path: "/home/p2pdops/Desktop/Screenshot_20200911_084420.png",
  size: 186564,
  status: StatusType.DONE,
};

const f3: DFile = {
  type: DFileType.RECEIVE_FILE,
  name: "Screenshot_20200911_084420.png",
  path: "/home/p2pdops/Desktop/Screenshot_20200911_084420.png",
  size: 186564,
  status: StatusType.PROCESSING,
};

const f4: DFile = {
  type: DFileType.RECEIVE_FILE,
  name: "Screenshot_20200911_084420.png",
  path: "/home/p2pdops/Desktop/Screenshot_20200911_084420.png",
  size: 186564,
  status: StatusType.WAITING,
};

const list: DFile[] = [f1, f2, f3, f4];

const _TransferList = ({ files }: Props) => {
  const listRef: React.RefObject<HTMLUListElement> = useRef(null);

  return (
    <div>
      <List ref={listRef}>
        {files.map((item, index) => (
          <TransferItem key={`transfer_${index}`} item={item} index={index} />
        ))}
      </List>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<null, { files: DFile[] }>({
  files: selectFilesStack,
});

const mapDispatchToProps = {};

const TransferList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TransferList);

export default TransferList;
