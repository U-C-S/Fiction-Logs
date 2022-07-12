import { ActionIcon, createStyles, Menu, Modal, Paper, Title, Tooltip } from "@mantine/core";
import React, { useContext, useState } from "react";
import { DotsVertical, Edit, InfoCircle, Trash } from "tabler-icons-react";
import { formType, IFilm, IFilmAlt, IWatchedFilm } from "../../types/film";
import { FilmForm } from "./FilmForm";

const useStyles = createStyles(() => ({
	root: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		boxSizing: "border-box",
		width: "100%",
		borderRadius: "5px",
		color: "aliceblue",
		paddingRight: "8px",

		".info": {
			display: "flex",
			alignItems: "center",
		},

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

export function FilmCard({
	data,
	isPlanningCard,
	editable,
}: {
	data: IFilmAlt;
	isPlanningCard?: boolean;
	editable?: boolean;
}) {
	const { classes } = useStyles();
	const [openedModal, setOpenedModal] = useState(false);

	async function Delete() {
		let req = await fetch(`/api/filmlist/delete/${data.id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		req.status === 200 ? alert("Success") : alert("Failed");
	}

	// add a field to show when the film is added to the planning list
	return (
		<Paper
			shadow="xs"
			radius="md"
			p={`5px 15px`}
			withBorder
			style={{ backgroundColor: "#1e1a1a", display: "flex", alignItems: "center" }}>
			<div className={classes.root}>
				<Title order={3}>{data.name}</Title>
				{!isPlanningCard && (
					<div className="info">
						{data.comment && (
							<Tooltip label={data.comment} withArrow arrowSize={3}>
								<ActionIcon variant="hover">
									<InfoCircle size={20} />
								</ActionIcon>
							</Tooltip>
						)}
						<div>
							<p>⭐ {data.rating}</p>
							<p>{data.watched_on?.toString().slice(0, 10)}</p>
						</div>
					</div>
				)}
			</div>
			{editable && (
				<Menu
					control={
						<ActionIcon>
							<DotsVertical size={20} />
						</ActionIcon>
					}>
					<Menu.Item icon={<Edit size={14} />} onClick={() => setOpenedModal(true)}>
						Edit
					</Menu.Item>
					<Menu.Item color="red" icon={<Trash size={14} />} onClick={Delete}>
						Delete
					</Menu.Item>
				</Menu>
			)}
			{editable && (
				<Modal opened={openedModal} onClose={() => setOpenedModal(false)} title={`Edit "${data.name}"`}>
					<FilmForm
						film={data}
						TypeOfForm={isPlanningCard ? formType.edit_planning : formType.edit_watched}
					/>
				</Modal>
			)}
		</Paper>
	);
}
