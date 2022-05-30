import React from "react";

export interface IFilmData {
	title: string;
	rating: number;
	watchedOn: Date;
	comment: string;
}

interface IProfile {
	name: string;
	image: string;
	watchedList: IFilmData[];
	planningList: string[];
	updateWatchList: any;
	updatePlanningList: any;
}

export let ProfileContextDefaultValue: IProfile = {
	name: "",
	image: "",
	watchedList: [],
	planningList: [],
	updateWatchList: null,
	updatePlanningList: null
};

export const ProfileContext = React.createContext<IProfile>(ProfileContextDefaultValue);
