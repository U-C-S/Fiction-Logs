import { createStyles, Menu, Modal, Paper, Title } from "@mantine/core";
import React, { useContext, useState } from "react";
import { Trash } from "tabler-icons-react";
import { IFilm, IWatchedFilm } from "../../types/film";
import FilmForm from "./FilmForm";

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
				<Title order={3}>{data.name}</Title>
				<div>
					<p>⭐ {data.rating}</p>
					<p>{data.watched_on?.toISOString().slice(0, 10)}</p>
				</div>
			</div>
		</Paper>
	);
}

export function PlanningFilmCard({ id, name, editable }: { id: number; name: string; editable: boolean }) {
	const { classes } = useStyles();
	// const profileCon = useContext(ProfileContext);
	const [openedModal, setOpenedModal] = useState(false);

	function Delete() {
		// profileCon.updateList(list => {
		// 	list.planningList = list.planningList.filter(x => x.id !== id);
		// 	return { watchedList: list.watchedList, planningList: list.planningList };
		// });
	}

	// add a field to show when the film is added to the planning list
	return (
		<Paper shadow="xs" radius="md" p={`10px 15px`} withBorder style={{ backgroundColor: "#1e1a1a" }}>
			<div className={classes.root}>
				<Title order={3}>{name}</Title>
				{editable && (
					<Menu>
						<Menu.Item onClick={() => setOpenedModal(true)}>Set as Watched</Menu.Item>
						<Menu.Item color="red" icon={<Trash size={14} />} onClick={Delete}>
							Delete
						</Menu.Item>
					</Menu>
				)}
			</div>
			{editable && (
				<Modal opened={openedModal} onClose={() => setOpenedModal(false)} title="Want to add something ?">
					<FilmForm isAlreadyPlanning film={{ id, name }} />
				</Modal>
			)}
		</Paper>
	);
}
