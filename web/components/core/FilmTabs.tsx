import { Stack, Tabs } from "@mantine/core";
import useSWR from "swr";
import { Edit, Photo } from "tabler-icons-react";
import { fetcherWithAuth } from "../../lib/fetcher";
import { IFilm } from "../../types/film";
import { FilmCard, PlanningFilmCard } from "./FilmCard";
import { LoadingScreen } from "./LoadingScreen";

export function FilmTabs({ filmsList, isOwner }: { filmsList: IFilm[]; isOwner: boolean }) {
	return (
		<div style={{ marginTop: "1rem", width: "clamp(300px, 60%, 550px)" }}>
			<Tabs grow>
				<Tabs.Tab label="Watched" icon={<Photo size={20} />}>
					<Stack>
						{filmsList.map(film => {
							if (film.is_watched) {
								return <FilmCard data={film} key={film.id} />;
							}
						})}
					</Stack>
				</Tabs.Tab>
				<Tabs.Tab label="Planning" icon={<Edit size={20} />}>
					<Stack>
						{filmsList.map(film => {
							if (!film.is_watched) {
								return <PlanningFilmCard name={film.name} id={film.id} key={film.id} editable={isOwner} />;
							}
						})}
					</Stack>
				</Tabs.Tab>
			</Tabs>
		</div>
	);
}

export function FilmTabsDynamic() {
	const { data, error } = useSWR("/api/filmlist/me", fetcherWithAuth);

	if (!data) return <LoadingScreen />;

	return <FilmTabs isOwner filmsList={data} />;
}
