import { createStyles, SimpleGrid, Stack, Tabs } from "@mantine/core";
import React, { useContext } from "react";

import { IProfileFetchData } from "../../types/profile";
import { ControlsOverlay, FilmCard, ProfileHeader } from "../core";
import { FilmTabs } from "../core/FilmTabs";

const useStyles = createStyles(() => ({
	root: {
		padding: "0.5rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
}));

export default function TheComp({ profileData }: { profileData: IProfileFetchData }) {
	const { classes } = useStyles();

	return (
		<div className={classes.root}>
			<ProfileHeader name={profileData.name} image={profileData.avatar} />
			<FilmTabs filmsList={profileData.film} isOwner={false} />
			<ControlsOverlay />
		</div>
	);
}
