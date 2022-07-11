// export interface IFilm {
// 	name: string;
// 	id: number;
// 	comment: string | null;
// 	is_watched: boolean;
// 	watched_on: Date | null;
// 	rating: number | null;
// }

export type IPlanningFilm = {
	is_watched: false;
	id: number;
	name: string;
};

export type IWatchedFilm = {
	is_watched: true;
	id: number;
	name: string;
	comment: string;
	watched_on: Date;
	rating: number;
};

export type IFilm = IPlanningFilm | IWatchedFilm;
