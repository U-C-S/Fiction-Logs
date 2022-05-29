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
	updateWatchList: any;
}

export let ProfileContextDefaultValue: IProfile = {
	name: "",
	image: "",
	watchedList: [],
	updateWatchList: null,
};

export const ProfileContext = React.createContext<IProfile>(ProfileContextDefaultValue);
