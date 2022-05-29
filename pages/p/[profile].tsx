import React, { Suspense, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Center, createStyles, Loader, Tabs } from "@mantine/core";

import { ProfileContext } from "../../lib/profileContext";
import dynamic from "next/dynamic";

const LoggedIn = dynamic(
	async () => {
		const [ProfileHeader] = await Promise.all([
			import("../../components/layout/LoggedIn"),
			new Promise(resolve => setTimeout(resolve, 3000)),
		]);
		return ProfileHeader;
	},
	{
		ssr: false,
		loading: () => (
			<Center style={{ width: "100vw", height: "100vh" }}>
				<Loader color="red" variant="bars" />
			</Center>
		),
	}
);

export default function IndexPage() {
	const router = useRouter();
	let { profile } = router.query;

	useEffect(() => {
		if (false) {
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
			<LoggedIn />
		</ProfileContext.Provider>
	);
}
