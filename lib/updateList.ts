import { useContext, useState } from "react";
import { IPlanningFilm, IWatchedFilm, ProfileContext } from "./profileContext";

export function useListUpdater() {
	const profileContext = useContext(ProfileContext);
	const [watchedlist, updateWatchedList] = useState<IWatchedFilm[]>([]);
	const [planningList, updatePlanningList] = useState<IPlanningFilm[]>([]);

	return {
		updateList: (list: string[]) => {},
	};
}
