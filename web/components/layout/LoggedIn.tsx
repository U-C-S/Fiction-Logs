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

export default function TheComp({ datax }: { datax: IProfileFetchData }) {
	const { classes } = useStyles();
	const profileCon = useContext(ProfileContext);
	let { data } = datax;

	return (
		<div className={classes.root}>
			<ProfileHeader name={data.name} image={profileCon.image} />
			<div className="thetabs">
				<Tabs grow>
					<Tabs.Tab label="Watched" icon={<Photo size={20} />}>
						<Stack>
							{data.film.map(film => {
								if (film.is_watched) {
									return <FilmCard data={film} key={film.id} />;
								}
							})}
						</Stack>
					</Tabs.Tab>
					<Tabs.Tab label="Planning" icon={<Edit size={20} />}>
						<SimpleGrid cols={2}>
							{data.film.map(film => {
								if (!film.is_watched) {
									return <PlanningFilmCard name={film.name} id={film.id} key={film.id} />;
								}
							})}
						</SimpleGrid>
					</Tabs.Tab>
				</Tabs>
			</div>

			<ControlsOverlay />
		</div>
	);
}
