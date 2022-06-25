import { Button, createStyles, Divider, Modal, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import { LoginForm } from "../components/core";

const useStyles = createStyles(() => ({
	root: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
	},

	container: {
		margin: "0 auto",
		width: "500px",
		height: "300px",
		color: "aliceblue",
		textAlign: "center",
	},

	littleFooter: {
		position: "absolute",
		bottom: "0",
		fontSize: "10px !important",
		color: "aliceblue",
	},
}));

export default function Page() {
	const [opened, setOpened] = useState(false);
	const { classes } = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<Title order={1}>Fiction Logs</Title>
				<Divider my="sm" />
				<Text style={{ margin: "15px" }}>A Simple Web App to store your film watch lists</Text>
				<Button onClick={() => setOpened(true)}>Authenticate Now</Button>
			</div>
			<div className={classes.littleFooter}>
				<Text>Copyright © 2022</Text>
			</div>
			<Modal centered opened={opened} onClose={() => setOpened(false)} title="Welcome to Fiction Logs!">
				<LoginForm />
			</Modal>
		</div>
	);
}
