import React from "react";

export interface IWatchedFilm {
	id: number;
	title: string;
	rating: number;
	watchedOn: Date;
	comment: string;
}

export interface IPlanningFilm {
	id: number;
	title: string;
}

interface IProfile {
	name: string;
	image: string;
	watchedList: IWatchedFilm[];
	planningList: IPlanningFilm[];
	updateWatchList: any;
	updatePlanningList: any;
}

export let ProfileContextDefaultValue: IProfile = {
	name: "",
	image: "",
	watchedList: [],
	planningList: [],
	updateWatchList: null,
	updatePlanningList: null,
};

export const ProfileContext = React.createContext<IProfile>(ProfileContextDefaultValue);
