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

export interface IFilmAlt {
	id: number;
	name: string;
	is_watched: boolean;
	comment?: string | null;
	watched_on?: Date | null;
	rating?: number | null;
}

export enum formType {
	new = "new",
	edit_planning = "editP",
	edit_watched = "editW",
}

export interface IFilmFormProps {
	TypeOfForm: formType;
	film?: IFilmAlt;
}

export type IFilmFields = Omit<IFilmAlt, "id">;
