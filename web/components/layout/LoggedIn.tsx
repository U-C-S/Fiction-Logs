import { createStyles, SimpleGrid, Stack, Tabs } from "@mantine/core";
import React, { useContext } from "react";
import { Photo, Edit, Settings } from "tabler-icons-react";

import { ProfileContext } from "../../lib/profileContext";
import { IProfileFetchData } from "../../types/profile";
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

export default function TheComp({
	profileData,
	isOwner,
}: {
	profileData: IProfileFetchData;
	isOwner: boolean;
}) {
	const { classes } = useStyles();
	const profileCon = useContext(ProfileContext);

	return (
		<div className={classes.root}>
			<ProfileHeader name={profileData.name} image={profileCon.image} />
			<div className="thetabs">
				<Tabs grow>
					<Tabs.Tab label="Watched" icon={<Photo size={20} />}>
						<Stack>
							{profileData.film.map(film => {
								if (film.is_watched) {
									return <FilmCard data={film} key={film.id} />;
								}
							})}
						</Stack>
					</Tabs.Tab>
					<Tabs.Tab label="Planning" icon={<Edit size={20} />}>
						<Stack>
							{profileData.film.map(film => {
								if (!film.is_watched) {
									return <PlanningFilmCard name={film.name} id={film.id} key={film.id} editable={isOwner} />;
								}
							})}
						</Stack>
					</Tabs.Tab>
				</Tabs>
			</div>

			<ControlsOverlay />
		</div>
	);
}
