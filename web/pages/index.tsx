import { Button, createStyles, Divider, Modal, Text, Title } from "@mantine/core";
import Router from "next/router";
import React, { useContext, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { LoginForm } from "../components/core";

const useStyles = createStyles(theme => ({
	background: {
		overflow: "hidden",
		height: "100vh",
		width: "100%",
		backgroundColor: theme.colors.red[6],

		svg: {
			// width: "100%",
			height: "100%",
		},
	},
	root: {
		boxSizing: "border-box",
		position: "absolute",
		bottom: "0",
		display: "grid",
		gridTemplateColumns: "1fr 380px",
		gridTemplateRows: "4fr 5fr 3fr",
		gridTemplateAreas: `
			". ."
			"title form"
			". ."
		`,
		columnGap: "200px",
		padding: "25px 50px",
		width: "100%",
		height: "100vh",

		"@media (max-width: 1100px)": {
			padding: "25px 4%",
			gridTemplateColumns: "1fr",
			gridTemplateRows: "5fr 3fr",
			gridTemplateAreas: `
				"title"
				"form"
				`,
		},
	},

	container: {
		padding: "60px 0",
		gridArea: "title",
		color: "aliceblue",
		textAlign: "center",

		h1: {
			fontSize: "48px",
		},
		span: {
			color: theme.colors.red[6],
		},

		"@media (max-width: 1100px)": {
			padding: "0",
		},
	},

	form: {
		gridArea: "form",
		width: "clamp(350px, 90%, 420px)",
		margin: "0 auto",
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
			<div className={classes.background}>
				<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M1048.44 575.5C939.111 693.5 799.556 751.5 676 804.5C552.444 857.5 383.111 900 208 900H0V0H807.556H1600C1389.33 74 1359.56 100.5 1257.78 202.5C1158.56 301.939 1157.78 457.5 1048.44 575.5Z"
						fill="black"
					/>
				</svg>
			</div>
			<div className={classes.root}>
				<div className={classes.container}>
					<Title order={1}>
						<span>F</span>ICTION <span>L</span>OGS
					</Title>
					<Divider my="sm" style={{ width: "300px", margin: "10px auto" }} />
					<Text style={{ margin: "15px" }}>
						A Minimal Web-app to keep a list of your planning and watched films
					</Text>
				</div>
				<LoginForm className={classes.form} />
			</div>
			<div className={classes.littleFooter}>
				<Text>Copyright © 2022</Text>
			</div>
		</>
	);
}
