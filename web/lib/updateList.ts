import { useContext, useState } from "react";
import { IPlanningFilm, IFilmList, ProfileContext } from "./profileContext";

enum ListType {
	Watched,
	Planning,
}
/*
type UpdateListParams =
	| {
			isPlanning: false;
			film: IWatchedFilm;
	  }
	| {
			isPlanning: true;
			film: IPlanningFilm;
	  };
*/
export function useListUpdater() {
	// const profileContext = useContext(ProfileContext);
	const [list, updateList] = useState<IFilmList>({
		watchedList: [],
		planningList: [],
	});
	// const [planningList, updatePlanningList] = useState<IPlanningFilm[]>(profileContext.planningList);

	return { list, updateList };
}
