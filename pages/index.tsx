import { createStyles } from "@mantine/core";
import React, { useState } from "react";
import { ProfileHeader } from "../components/core";

const useStyles = createStyles(() => ({
	root: {
		padding: "1rem",
		display: "flex",
		justifyContent: "center",
	},
}));

export default function IndexPage() {
	const { classes } = useStyles();
	const [profile, setProfile] = useState({
		name: "Manté",
		image: "https://avatars.dicebear.com/api/avataaars/chanakya555.svg"
	});


	return (
	<div className={classes.root}>
		<ProfileHeader name={profile.name} image={profile.image} />
	</div>
	);
}
