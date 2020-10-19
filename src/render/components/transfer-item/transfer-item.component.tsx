import React from "react";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
} from "@material-ui/core";

import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import { DFile, DFileType, StatusType } from "../../index.d";
import { humanizeFileSize } from "../../utils/all_utils";

import "./transfer-item.styles.scss";
import { Done } from "@material-ui/icons";

interface Props {
  item: DFile;
  index: number;
}

const TransferItem = ({ item, index }: Props) => {
  const { type, status } = item;
  const AvatarIcon =
    status === StatusType.DONE
      ? Done
      : type === DFileType.SEND_FILE
      ? ArrowUpwardRoundedIcon
      : ArrowDownwardRoundedIcon;

  const avatarClassName: string =
    status === StatusType.DONE
      ? "done"
      : type === DFileType.SEND_FILE && status === StatusType.PROCESSING
      ? "uploading"
      : type === DFileType.RECEIVE_FILE && status === StatusType.PROCESSING
      ? "downloading"
      : "waiting";

  const work: string =
    status === StatusType.DONE
      ? "Done"
      : type === DFileType.SEND_FILE && status === StatusType.PROCESSING
      ? "Sending"
      : type === DFileType.RECEIVE_FILE && status === StatusType.PROCESSING
      ? "Receiving"
      : "Waiting";

  console.warn("transfer Item - ", item);
  console.warn("transfer Item - ", avatarClassName);
  console.warn("transfer Item - ", work);

  return (
    <>
      <ListItem key={`item_${index}`}>
        <ListItemAvatar className={avatarClassName}>
          <IconButton>
            <AvatarIcon />
          </IconButton>
        </ListItemAvatar>
        <div className="text-container">
          <b className="fileName">{item.name}</b>
          <div className="text-container-row">
            <span>{humanizeFileSize(+item.size)}</span>
            <span>{"Video"}</span>
            <span>{work}</span>
          </div>
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default TransferItem;
