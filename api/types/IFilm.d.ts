import { film } from "@prisma/client";

interface IPlanningFilm extends Omit<film, "watched_on" | "rating"> {
	is_watched: false;
}
interface IWatchedFilm extends film {
	is_watched: true;
}

export type IFilm = IWatchedFilm | IPlanningFilm;
