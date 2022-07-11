import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import Router, { useRouter } from "next/router";

import { ProfileContext } from "../lib/profileContext";
import { fetcher, fetcherWithAuth } from "../lib/fetcher";
import { LoadingScreen } from "../components/core";
import LoggedIn from "../components/layout/LoggedIn";
import { AuthContext } from "../components/context/authContext";
import { IFilm, IProfileFetchData } from "../types/profile";

const useProfile = () => {
	const [fetchedData, updatefetchedData] = useState<IProfileFetchData | null>(null);
	const { data, error } = useSWR<{ success: boolean; data: IProfileFetchData }>(
		!fetchedData ? `/api/profile/me/all` : null,
		fetcherWithAuth
	);

	if (!fetchedData && data) {
		updatefetchedData(data.data);
	}

	return { data: fetchedData, error };
};

export default function IndexPage() {
	const { authData } = useContext(AuthContext);
	// const [list, setList] = useState<IFilm[]>([]);
	const { data, error } = useProfile();

	if (!data) return <LoadingScreen />;
	// if (error) return <div>failed to load</div>;
	if (!authData) Router.push("/");

	return <LoggedIn profileData={data} isOwner={true} />;
}
