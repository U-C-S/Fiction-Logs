import { Space, Stack, Tabs } from "@mantine/core";
import useSWR from "swr";
import { Edit, Photo } from "tabler-icons-react";
import { fetcherWithAuth } from "../../lib/fetcher";
import { IFilm } from "../../types/film";
import { FilmCard } from "./FilmCard";
import { LoadingScreen } from "./LoadingScreen";

export function FilmTabs({ filmsList, isOwner }: { filmsList: IFilm[]; isOwner: boolean }) {
	return (
		<div style={{ marginTop: "1rem", width: "clamp(300px, 60%, 550px)" }}>
			<Tabs>
				<Tabs.List>
					<Tabs.Tab value="Watched" icon={<Photo size={20} />} />
					<Tabs.Tab value="Planning" icon={<Edit size={20} />} />
				</Tabs.List>
				<Tabs.Panel value="Watched">
					<Stack>
						{filmsList.map(film => {
							if (film.is_watched) {
								return <FilmCard data={film} key={film.id} editable={isOwner} />;
							}
						})}
						<Space h={70} />
					</Stack>
				</Tabs.Panel>
				<Tabs.Panel value="Planning">
					<Stack>
						{filmsList.map(film => {
							if (!film.is_watched) {
								return <FilmCard isPlanningCard data={film} key={film.id} editable={isOwner} />;
							}
						})}
					</Stack>
				</Tabs.Panel>
			</Tabs>
		</div>
	);
}

export function FilmTabsDynamic() {
	const { data, error } = useSWR("/api/filmlist/me", fetcherWithAuth);

	if (!data) return <LoadingScreen style={{ height: "70vh" }} />;

	return <FilmTabs isOwner filmsList={data} />;
}
