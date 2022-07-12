import { Avatar, createStyles } from "@mantine/core";
import React from "react";

interface IProfileHeaderProps {
	name: string;
	image?: string | null;
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
			fontSize: "2.5rem",
		},

		[".mantine-Avatar-root"]: {
			backgroundColor: "aliceblue",
			borderRadius: "50%",
			padding: "2px",
		},

		[".mantine-Avatar-image"]: {
			borderRadius: "50%",
		},
	},
}));

export function ProfileHeader({ name, image }: IProfileHeaderProps) {
	const { classes } = useStyles();

	if (!image) image = `https://avatars.dicebear.com/api/avataaars/${name}.svg`;
	if (!image.startsWith("http")) image = `https://avatars.dicebear.com/api/avataaars/${image}.svg`;

	return (
		<div className={classes.root}>
			<Avatar src={image} size={80} alt={name} />
			<h1>{name}</h1>
		</div>
	);
}
