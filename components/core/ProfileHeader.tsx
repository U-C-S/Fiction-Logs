import { createStyles } from "@mantine/core";
import React from "react";

interface IProfileHeaderProps {
	name: string;
	image: string;
}
const useStyles = createStyles(() => ({
	root: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		columnGap: "2rem",

		h1: {
			color: "aliceblue",
			fontFamily: "Nunito",
			fontSize: "3rem",
		},

		img: {
			backgroundColor: "aliceblue",
			padding: "0.5rem",
			borderRadius: "50%",
			width: "80px",
			height: "80px",
		},
	},
}));

export function ProfileHeader({ name, image }: IProfileHeaderProps) {
	const { classes } = useStyles();

	return (
		<div className={classes.root}>
			<img src={image} alt={name} />
			<h1>{name}</h1>
		</div>
	);
}
