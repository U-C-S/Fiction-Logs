import type { IFilm } from "./film";

export interface IProfileFetchData {
	id: number;
	name: string;
	email: string | null;
	created_at: Date | null;
	film: IFilm[];
}
