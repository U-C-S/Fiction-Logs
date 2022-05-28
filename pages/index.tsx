import { createStyles, Tabs } from "@mantine/core";
import React, { useState } from "react";
import { Photo, Settings, Edit } from "tabler-icons-react";
import { ProfileHeader } from "../components/core";

const useStyles = createStyles(() => ({
	root: {
		padding: "1rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",

		[".thetabs"]: {
			marginTop: "1rem",
			width: "clamp(320px, 75%, 600px)",
		},
	},
}));

function TheTabs() {
	return (
		<Tabs grow>
			<Tabs.Tab label="Watched" icon={<Photo size={16} />}>
				Gallery tab content
			</Tabs.Tab>
			<Tabs.Tab label="Planning" icon={<Edit size={16} />}>
				Messages tab content
			</Tabs.Tab>
			<Tabs.Tab label="Settings" icon={<Settings size={16} />}>
				Settings tab content
			</Tabs.Tab>
		</Tabs>
	);
}

export default function IndexPage() {
	const { classes } = useStyles();
	const [profile, setProfile] = useState({
		name: "Manté",
		image: "https://avatars.dicebear.com/api/avataaars/chanakya555.svg",
	});

	return (
		<div className={classes.root}>
			<ProfileHeader name={profile.name} image={profile.image} />
			<div className="thetabs">
				<TheTabs />
			</div>
		</div>
	);
}
