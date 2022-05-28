import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createStyles, Tabs } from "@mantine/core";
import { Photo, Settings, Edit } from "tabler-icons-react";

import { ProfileHeader } from "../../components/core";
import { ProfileContext, ProfileContextDefaultValue } from "../../lib/profileContext";

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
		<div className="thetabs">
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
		</div>
	);
}

function TheComp() {
	const { classes } = useStyles();
	const profileCon = useContext(ProfileContext);

	return (
		<div className={classes.root}>
			<ProfileHeader name={profileCon.name} image={profileCon.image} />
			<TheTabs />
		</div>
	);
}

export default function IndexPage() {
	const router = useRouter();
	let { profile } = router.query;

	useEffect(() => {
		if (profile == null || profile == "") {
			router.push("/me");
		}
	});

	let namex = profile?.toString() || "lol";
	return (
		<ProfileContext.Provider
			value={{
				name: namex,
				image: `https://avatars.dicebear.com/api/avataaars/${namex}.svg`,
			}}>
			<TheComp />
		</ProfileContext.Provider>
	);
}
