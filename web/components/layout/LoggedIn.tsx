import { createStyles, SimpleGrid, Stack, Tabs } from "@mantine/core";
import React, { useContext } from "react";
import { Photo, Edit, Settings } from "tabler-icons-react";

import { ProfileContext } from "../../lib/profileContext";
import { IProfileFetchData } from "../../types/profile";
import { ControlsOverlay, FilmCard, PlanningFilmCard, ProfileHeader } from "../core";
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
	// const profileCon = useContext(ProfileContext);

	return (
		<div className={classes.root}>
			<ProfileHeader
				name={profileData.name}
				image={`https://avatars.dicebear.com/api/avataaars/${profileData.name}.svg`}
			/>
			<FilmTabs filmsList={profileData.film} isOwner={false} />
			<ControlsOverlay />
		</div>
	);
}
