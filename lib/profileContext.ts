import React from "react";

export interface IPlanningFilm {
	id: number;
	title: string;
}

export interface IWatchedFilm extends IPlanningFilm {
	rating: number;
	watchedOn: Date;
	comment: string;
}


export type IFilmList = {
	watchedList: IWatchedFilm[];
	planningList: IPlanningFilm[];
};

interface IProfile {
	name: string;
	image: string;
	list: IFilmList;
	updateList: React.Dispatch<React.SetStateAction<IFilmList>>;
}

export let ProfileContextDefaultValue: IProfile = {
	name: "",
	image: "",
	list: {
		watchedList: [],
		planningList: [],
	},
	updateList: () => {},
};

export const ProfileContext = React.createContext<IProfile>(ProfileContextDefaultValue);
