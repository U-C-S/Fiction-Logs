import { Button, createStyles, Divider, Modal, Text, Title } from "@mantine/core";
import Router from "next/router";
import React, { useContext, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { LoginForm } from "../components/core";

const useStyles = createStyles(() => ({
	root: {
		boxSizing: "border-box",
		position: "absolute",
		bottom: "0",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0 60px",
		width: "100%",
		height: "100vh",
	},

	container: {
		width: "500px",
		height: "300px",
		color: "aliceblue",
		textAlign: "center",
	},

	littleFooter: {
		width: "100%",
		textAlign: "center",
		position: "absolute",
		bottom: "0",
		fontSize: "10px !important",
		color: "aliceblue",
	},
}));

export default function Page() {
	// const [opened, setOpened] = useState(false);
	const { classes } = useStyles();
	const { authData } = useContext(AuthContext);

	if (authData) Router.push("/me");

	return (
		<>
			<div style={{ overflow: "hidden", height: "100vh", width: "100%", backgroundColor: "coral" }}>
				<svg viewBox="0 0 1600 900" style={{ height: "100vh" }} xmlns="http://www.w3.org/2000/svg">
					<path
						d="M1048.44 575.5C939.111 693.5 799.556 751.5 676 804.5C552.444 857.5 383.111 900 208 900H0V0H807.556H1600C1389.33 74 1359.56 100.5 1257.78 202.5C1158.56 301.939 1157.78 457.5 1048.44 575.5Z"
						fill="black"
					/>
				</svg>
			</div>
			<div className={classes.root}>
				<div className={classes.container}>
					<Title order={1}>Fiction Logs</Title>
					<Divider my="sm" />
					<Text style={{ margin: "15px" }}>A Simple Web App to store your film watch lists</Text>
				</div>
				<LoginForm />
				{/* <Modal centered opened={opened} onClose={() => setOpened(false)} title="Welcome to Fiction Logs!">
					<LoginForm style={{ width: "500px" }} />
				</Modal> */}
			</div>
			<div className={classes.littleFooter}>
				<Text>Copyright © 2022</Text>
			</div>
		</>
	);
}
