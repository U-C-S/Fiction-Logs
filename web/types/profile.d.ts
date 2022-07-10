export interface IFilm {
	name: string;
	id: number;
	comment: string | null;
	is_watched: boolean;
	watched_on: Date | null;
	rating: number | null;
}

export interface IProfileFetchData {
	success: true;
	data: {
		id: number;
		name: string;
		email: string | null;
		created_at: Date | null;
		film: IFilm[];
	};
}
