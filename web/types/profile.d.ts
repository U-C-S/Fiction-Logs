export interface IFilm {
	name: string;
	id: number;
	comment: string | null;
	is_watched: boolean;
	watched_on: Date | null;
	rating: number | null;
}

// export type IFilm =
// 	| {
// 			is_watched: false;
// 			id: number;
// 			name: string;
// 	  }
// 	| {
// 			is_watched: true;
// 			id: number;
// 			name: string;
// 			comment: string;
// 			watched_on: Date;
// 			rating: number;
// 	  };

export interface IProfileFetchData {
	id: number;
	name: string;
	email: string | null;
	created_at: Date | null;
	film: IFilm[];
}
