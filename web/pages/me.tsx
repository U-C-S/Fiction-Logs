import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import Router, { useRouter } from "next/router";

import { fetcher, fetcherWithAuth } from "../lib/fetcher";
import { ControlsOverlay, LoadingScreen, ProfileHeader, FilmTabsDynamic } from "../components/core";
import { AuthContext } from "../components/context/AuthContext";
import { IProfileFetchData } from "../types/profile";
import { createStyles } from "@mantine/core";

const useProfile = (authInfo: any | null) => {
	const [fetchedData, updatefetchedData] = useState<IProfileFetchData | null>(null);
	const { data, error } = useSWR<{ success: boolean; data: IProfileFetchData }>(
		!fetchedData && authInfo ? `/api/profile/me` : null,
		fetcherWithAuth
	);

	if (!fetchedData && data) {
		updatefetchedData(data.data);
	}

	return { data: fetchedData, error };
};

const useStyles = createStyles(() => ({
	root: {
		padding: "0.5rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
}));

export default function IndexPage() {
	const { authData } = useContext(AuthContext);
	const { data, error } = useProfile(authData);
	const { classes } = useStyles();
	// const [list, setList] = useState<IFilm[]>([]);

	if (!data) return <LoadingScreen />;
	// if (error) return <div>failed to load</div>;
	if (!authData) Router.push("/");

	return (
		<div className={classes.root}>
			<ProfileHeader name={data.name} image={data.avatar} />
			<FilmTabsDynamic />
			<ControlsOverlay />
		</div>
	);
}
