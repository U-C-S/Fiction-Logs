import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { IFilmList, IPlanningFilm, IWatchedFilm, ProfileContext } from "../../lib/profileContext";
import { LoadingScreen } from "../../components/core";
import useSWR from "swr";
import { fetcher, fetcherWithAuth } from "../../lib/fetcher";
import LoggedIn from "../../components/layout/LoggedIn";
import { IProfileFetchData } from "../../types/profile";

const useProfile = (profileName: string) => {
	const [fetchedData, updatefetchedData] = useState<IProfileFetchData | null>(null);
	const { data, error } = useSWR<IProfileFetchData>(
		!fetchedData ? `/api/profile/byname/${profileName}/all` : null,
		fetcherWithAuth
	);

	if (!fetchedData && data) {
		updatefetchedData(data);
	}

	return { data: fetchedData, error };
};

export default function IndexPage() {
	const router = useRouter();
	let { profile } = router.query;
	const { data, error } = useProfile(profile as string);

	// useEffect(() => {
	// 	if (false) {
	// 		router.push("/me");
	// 	}
	// });

	// if (error) return <div>failed to load</div>;
	if (!data) return <LoadingScreen />;

	let namex = profile?.toString() as string;
	return (
		<ProfileContext.Provider
			value={{
				name: namex,
				image: `https://avatars.dicebear.com/api/avataaars/${namex}.svg`,
			}}>
			<LoggedIn datax={data} />
		</ProfileContext.Provider>
	);
}
