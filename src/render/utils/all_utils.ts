import { RawFile } from "..";

const { remote } = window.require("electron");
const os = remote.require("os");
const network = remote.require("network");

const getIp: () => Promise<string> = () =>
  new Promise<string>(async (resolve, reject) => {
    // let ip = "";
    // var interfaces: any = os.networkInterfaces();
    // for (let interface_name of Object.keys(interfaces)) {
    //   for (let sub_interface of interfaces[interface_name]) {
    //     if ("IPv4" !== sub_interface.family || sub_interface.internal !== false)
    //       continue;
    //     ip = sub_interface.address;
    //   }
    // }
    network.get_active_interface(function (err: any, obj: any) {
      console.log("Get IP:", obj);
      resolve(obj.ip_address);
    });
  });

function extractFilesFromEvent(e: React.DragEvent<HTMLElement>): RawFile[] {
  e.preventDefault();
  let fileList = e.nativeEvent.dataTransfer?.files || new FileList();

  const files: RawFile[] = [];

  for (const _file of fileList) {
    files.push(_file);
  }

  return files;
}

const humanizeFileSize = (size: number) => {
  var i: number = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
};

const humanizeTimeLeft = (seconds: number) => {
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  let op = "";
  if (days) op += `${days} D`;
  if (hours) op += `${days ? " " : ""}${hours} H`;
  if (minutes) op += `${hours ? " " : ""}${minutes} M`;
  if (seconds) op += `${minutes ? " " : ""}${seconds} S`;

  return op;
};

export { getIp, extractFilesFromEvent, humanizeFileSize, humanizeTimeLeft };
