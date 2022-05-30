import { createStyles, SimpleGrid, Stack, Tabs } from "@mantine/core";
import React, { useContext } from "react";
import { Photo, Edit, Settings } from "tabler-icons-react";
import { ProfileContext } from "../../lib/profileContext";
import { ControlsOverlay, FilmCard, PlanningFilmCard, ProfileHeader } from "../core";

const useStyles = createStyles(() => ({
	root: {
		padding: "1rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",

		[".thetabs"]: {
			marginTop: "1rem",
			width: "clamp(360px, 75%, 600px)",
		},
	},
}));

export default function TheComp() {
	const { classes } = useStyles();
	const profileCon = useContext(ProfileContext);

	return (
		<div className={classes.root}>
			<ProfileHeader name={profileCon.name} image={profileCon.image} />
			<div className="thetabs">
				<Tabs grow>
					<Tabs.Tab label="Watched" icon={<Photo size={20} />}>
						<Stack>
							{profileCon.watchedList.map(film => (
								<FilmCard data={film} key={film.title} />
							))}
						</Stack>
					</Tabs.Tab>
					<Tabs.Tab label="Planning" icon={<Edit size={20} />}>
						<SimpleGrid cols={2}>
							{profileCon.planningList.map(film => (
								<PlanningFilmCard name={film} key={film} />
							))}
						</SimpleGrid>
					</Tabs.Tab>
					<Tabs.Tab label="Settings" icon={<Settings size={20} />}>
						Settings tab content
					</Tabs.Tab>
				</Tabs>
			</div>

			<ControlsOverlay />
		</div>
	);
}
