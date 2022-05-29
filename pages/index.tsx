import { Button, createStyles, Divider } from "@mantine/core";
import React from "react";

const useStyles = createStyles(() => ({
	root: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
	},

	container: {
		width: "500px",
		height: "300px",
		color: "aliceblue",
		textAlign: "center",
		fontFamily: "Nunito",
	},

	btns: {
		margin: "20px auto",
		width: "80%",
		display: "flex",
		justifyContent: "space-around",
	},
}));

export default function Page() {
	const { classes } = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<h1>Fiction Logs</h1>
				<Divider my="sm" />
				<p>A Simple Web App to store your film watch lists</p>
				<div className={classes.btns}>
					<Button>Login</Button>
					<Button>SignUp</Button>
				</div>
			</div>
		</div>
	);
}
