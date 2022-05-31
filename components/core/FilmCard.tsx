import { createStyles, Menu, Paper, Title } from "@mantine/core";
import { useId } from "@mantine/hooks";
import React, { useContext } from "react";
import { Trash } from "tabler-icons-react";
import { IPlanningFilm, IWatchedFilm, ProfileContext } from "../../lib/profileContext";

const useStyles = createStyles(() => ({
	root: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		boxSizing: "border-box",
		width: "100%",
		borderRadius: "5px",
		color: "aliceblue",

		h3: {
			fontSize: "1rem",
			margin: "0",
		},
		p: {
			lineHeight: "0.5rem",
			fontSize: "0.8rem",
			textAlign: "right",
		},
	},
}));

export function FilmCard({ data }: { data: IWatchedFilm }) {
	const { classes } = useStyles();

	return (
		<Paper shadow="xs" radius="md" p={`5px 15px`} withBorder style={{ backgroundColor: "#1e1a1a" }}>
			<div className={classes.root}>
				<Title order={3}>{data.title}</Title>
				<div>
					<p>⭐ {data.rating}</p>
					<p>{data.watchedOn.toISOString().slice(0, 10)}</p>
				</div>
			</div>
		</Paper>
	);
}

export function PlanningFilmCard({ id, title }: IPlanningFilm) {
	const { classes } = useStyles();
	const profileCon = useContext(ProfileContext);

	function Delete() {
		profileCon.updateList(list => {
			list.planningList = list.planningList.filter(x => x.id !== id);
			return { watchedList: list.watchedList, planningList: list.planningList };
		});
	}
	return (
		<Paper shadow="xs" radius="md" p={`10px 15px`} withBorder style={{ backgroundColor: "#1e1a1a" }}>
			<div className={classes.root}>
				<Title order={3}>{title}</Title>
				<Menu>
					<Menu.Item>Set as Watched</Menu.Item>
					<Menu.Item color="red" icon={<Trash size={14} />} onClick={Delete}>
						Delete
					</Menu.Item>
				</Menu>
			</div>
		</Paper>
	);
}
