import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { IFilmList, IPlanningFilm, IWatchedFilm, ProfileContext } from "../../lib/profileContext";
import { LoadingScreen } from "../../components/core";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import LoggedIn from "../../components/layout/LoggedIn";

export default function IndexPage() {
	const [list, updateList] = useState<IFilmList>({ watchedList: [], planningList: [] });
	const router = useRouter();
	let { profile } = router.query;
	const { data, error } = useSWR(`/api/profile/${profile}`, fetcher);

	// useEffect(() => {
	// 	if (false) {
	// 		router.push("/me");
	// 	}
	// });

	if (error) return <div>failed to load</div>;
	if (data == undefined) return <LoadingScreen />;

	let namex = profile?.toString() as string;
	return (
		<ProfileContext.Provider
			value={{
				name: namex,
				image: `https://avatars.dicebear.com/api/avataaars/${namex}.svg`,
				list,
				updateList,
			}}>
			<LoggedIn />
		</ProfileContext.Provider>
	);
}
