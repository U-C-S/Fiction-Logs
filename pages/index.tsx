import React, { useContext, useState } from "react";
import { createStyles, Tabs } from "@mantine/core";
import { Photo, Settings, Edit } from "tabler-icons-react";

import { ProfileHeader } from "../components/core";
import { ProfileContext, ProfileContextDefaultValue } from "../lib/profileContext";

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
	const profile = useContext(ProfileContext);

	return (
		<ProfileContext.Provider value={ProfileContextDefaultValue}>
			<div className={classes.root}>
				<ProfileHeader name={profile.name} image={profile.image} />
				<div className="thetabs">
					<TheTabs />
				</div>
			</div>
		</ProfileContext.Provider>
	);
}
