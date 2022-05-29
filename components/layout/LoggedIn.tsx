import { createStyles, Tabs } from "@mantine/core";
import React, { useContext } from "react";
import { Photo, Edit, Settings } from "tabler-icons-react";
import { ProfileContext } from "../../lib/profileContext";
import { ProfileHeader } from "../core";

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

export default function TheComp() {
	const { classes } = useStyles();
	const profileCon = useContext(ProfileContext);

	return (
		<div className={classes.root}>
			<ProfileHeader name={profileCon.name} image={profileCon.image} />
			<div className="thetabs">
				<Tabs grow>
					<Tabs.Tab label="Watched" icon={<Photo size={20} />}>
						Gallery tab content
					</Tabs.Tab>
					<Tabs.Tab label="Planning" icon={<Edit size={20} />}>
						Messages tab content
					</Tabs.Tab>
					<Tabs.Tab label="Settings" icon={<Settings size={20} />}>
						Settings tab content
					</Tabs.Tab>
				</Tabs>
			</div>{" "}
		</div>
	);
}
