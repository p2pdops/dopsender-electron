// import {
// 	Container,
// 	Divider,
// 	IconButton,
// 	List,
// 	ListItem,
// 	ListItemAvatar,
// 	ListItemSecondaryAction,
// 	ListItemText,
// 	Paper,
// } from "@material-ui/core";

// import React, {useRef} from "react";
// import {connect} from "react-redux";
// import {DFile, StatusType} from "../../index.d";

// interface Props {
// }

// const f1: DFile = {
// 	type: StatusType.SEND_FILE,
// 	name: "Screenshot_20200911_084420.png",
// 	path: "/home/p2pdops/Desktop/Screenshot_20200911_084420.png",
// 	size: 186564,
// };

// const f2: DFile = {
// 	type: StatusType.RECEIVE_FILE,
// 	name: "Screenshot_20200911_084420.png",
// 	path: "/home/p2pdops/Desktop/Screenshot_20200911_084420.png",
// 	size: 186564,
// };

// const list: DFile[] = [
// 	f1, f2, f1, f2,
// 	f1, f2, f1, f2,
// 	f1, f2, f1, f2,
// 	f1, f2, f1, f2,
// 	f1, f2, f1, f2,
// 	f1, f2, f1, f2,
// ];

// const _TransferList = (props: Props) => {

// 	const listRef: React.RefObject<HTMLUListElement> = useRef(null);

// 	return (
// 		<Container>
// 			<List ref={listRef}>
// 				{list.map((item, index) =>
// 					<>
// 						<ListItem ref={() => {
// 							if (index === list.length - 1) {
// 								listRef?.current?.scrollTo(0, listRef?.current?.scrollHeight);
// 							}
// 						}} key={`item_${index}`}>
// 							<ListItemAvatar>
// 								<IconButton>{item.type === StatusType.RECEIVE_FILE ? '->' : '<-'}</IconButton>
// 							</ListItemAvatar>
// 							<ListItemText primary={index + ' ' + item.name} secondary={item.size}/>
// 							<ListItemSecondaryAction>
// 								<IconButton aria-label="delete">
// 									{/* <DeleteIcon /> */}
// 								</IconButton>
// 							</ListItemSecondaryAction>
// 						</ListItem>
// 						<Divider/>
// 					</>)
// 				}
// 			</List>
// 		</Container>
// 	)
// };

// const mapStateToProps = (state: any) => ({});

// const mapDispatchToProps = {};

// const TransferList = connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(_TransferList);

// export default TransferList;
export {};
