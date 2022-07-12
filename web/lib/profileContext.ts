import React from "react";
import { IFilm } from "../types/film";

// export interface IPlanningFilm {
// 	id: number;
// 	title: string;
// }

// export interface IWatchedFilm extends IPlanningFilm {
// 	rating: number;
// 	watchedOn: Date;
// 	comment: string;
// }

// export type IFilmList = {
// 	watchedList: IWatchedFilm[];
// 	planningList: IPlanningFilm[];
// };

interface IProfile {
	name: string;
	image: string;
	list: IFilm[];
	updateList: React.Dispatch<React.SetStateAction<IFilm[]>>;
}

export let ProfileContextDefaultValue: IProfile = {
	name: "",
	image: "",
	list: [],
	updateList: () => {},
};

export const ProfileContext = React.createContext<IProfile>(ProfileContextDefaultValue);
