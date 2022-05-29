import { createStyles, Paper, Title } from "@mantine/core";
import React from "react";
import { IFilmData } from "../../lib/profileContext";

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

export function FilmCard({ data }: { data: IFilmData }) {
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
