import { createStyles, SimpleGrid, Stack, Tabs } from "@mantine/core";
import React, { useContext } from "react";
import { Photo, Edit, Settings } from "tabler-icons-react";
import { ProfileContext } from "../../lib/profileContext";
import { ControlsOverlay, FilmCard, PlanningFilmCard, ProfileHeader } from "../core";

const useStyles = createStyles(() => ({
	root: {
		padding: "0.5rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",

		[".thetabs"]: {
			marginTop: "1rem",
			width: "clamp(300px, 60%, 550px)",
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
							{profileCon.list.watchedList.map(film => (
								<FilmCard data={film} key={film.title} />
							))}
						</Stack>
					</Tabs.Tab>
					<Tabs.Tab label="Planning" icon={<Edit size={20} />}>
						<SimpleGrid cols={2}>
							{profileCon.list.planningList.map(film => (
								<PlanningFilmCard title={film.title} id={film.id} key={film.id} />
							))}
						</SimpleGrid>
					</Tabs.Tab>
				</Tabs>
			</div>

			<ControlsOverlay />
		</div>
	);
}
