import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { LoadingScreen } from "../../components/core";
import useSWR from "swr";
import { fetcher, fetcherWithAuth } from "../../lib/fetcher";
import LoggedIn from "../../components/layout/LoggedIn";
import { IProfileFetchData } from "../../types/profile";

const useProfile = (profileName: string) => {
	const [fetchedData, updatefetchedData] = useState<IProfileFetchData | null>(null);
	const { data, error } = useSWR<{ data: IProfileFetchData }>(
		!fetchedData ? `/api/profile/byname/${profileName}/all` : null,
		fetcher
	);

	if (!fetchedData && data) {
		updatefetchedData(data.data);
	}

	return { data: fetchedData, error };
};

export default function IndexPage() {
	const router = useRouter();
	let { profile } = router.query;
	const { data, error } = useProfile(profile as string);

	if (!data) return <LoadingScreen />;

	return <LoggedIn profileData={data} />;
}
