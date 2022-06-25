import { Paper, TextInput, Group, NumberInput, Button, Stack, Checkbox } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, useToggle } from "@mantine/hooks";
import React, { useContext } from "react";
import { IPlanningFilm, IWatchedFilm, ProfileContext } from "../../lib/profileContext";

interface IAddFilmFormProps {
	isAlreadyPlanning?: boolean;
	film?: IPlanningFilm;
}

export default function FilmForm(
	{ isAlreadyPlanning, film }: IAddFilmFormProps = { isAlreadyPlanning: false, film: {} as IPlanningFilm }
) {
	const [type, toggle] = useToggle("Watched", ["Watched", "Planning"]);
	const profile = useContext(ProfileContext);
	const theform = useForm<IWatchedFilm>({
		initialValues: {
			id: film?.id || Math.floor(Math.random() * 1000), // get the value of it from api
			title: film?.title || "",
			watchedOn: new Date(),
			rating: 0,
			comment: "",
		},
	});

	function AddToList(values: IWatchedFilm) {
		if (isAlreadyPlanning) {
			profile.updateList(list => {
				return {
					watchedList: list.watchedList.concat(values),
					planningList: list.planningList.filter(x => x.id !== values.id),
				};
			});
		} else {
			switch (type) {
				case "Watched":
					profile.updateList(c => {
						return { watchedList: c.watchedList.concat(values), planningList: c.planningList };
					});
					break;
				case "Planning":
					profile.updateList(c => {
						return { watchedList: c.watchedList, planningList: c.planningList.concat(values) };
					});
					break;
			}
		}
	}

	return (
		<Paper p="xl" withBorder>
			<form onSubmit={theform.onSubmit(AddToList)}>
				<Stack>
					<TextInput
						required
						label="Title"
						value={theform.values.title}
						disabled={isAlreadyPlanning}
						onChange={event => theform.setFieldValue("title", event.currentTarget.value)}
						data-autofocus
					/>
					<Checkbox
						checked={type === "Planning"}
						label="Planning to Watch ??"
						onChange={() => toggle()}
						disabled={isAlreadyPlanning}
					/>
					{type === "Watched" && (
						<>
							<Group grow>
								<NumberInput
									label="Rating"
									placeholder="⭐ Give it a Rating"
									min={0}
									max={10}
									value={theform.values.rating}
									onChange={v => theform.setFieldValue("rating", v || 2)}
								/>
								<DatePicker
									placeholder="Pick the date"
									label="Watched it on"
									inputFormat="YYYY-MM-DD"
									value={theform.values.watchedOn}
									onChange={v => theform.setFieldValue("watchedOn", v || new Date())}
								/>
							</Group>
							<TextInput
								label="Comment"
								placeholder="What did you think about it ?"
								value={theform.values.comment}
								onChange={event => theform.setFieldValue("comment", event.currentTarget.value)}
							/>
						</>
					)}
				</Stack>
				<Group position="right" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
		</Paper>
	);
}
