import { createStyles, Paper, Title } from "@mantine/core";
import React from "react";

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

interface IFilmData {
	title: string;
	rating: number;
	watchedOn: string;
	comment: string;
}

export function FilmCard({ data }: { data: IFilmData }) {
	const { classes } = useStyles();

	return (
		<Paper shadow="xs" radius="md" p={`5px 15px`} withBorder style={{ backgroundColor: "#1e1a1a" }}>
			<div className={classes.root}>
				<Title order={3}>{data.title}</Title>
				<div>
					<p>⭐ {data.rating}</p>
					<p>{data.watchedOn}</p>
				</div>
			</div>
		</Paper>
	);
}
