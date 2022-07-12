import { Paper, TextInput, Group, NumberInput, Button, Stack, Checkbox } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, useToggle } from "@mantine/hooks";
import React, { useContext } from "react";
import { IFilm, formType, IFilmFields, IFilmFormProps } from "../../types/film";

export function FilmForm({ film, TypeOfForm }: IFilmFormProps) {
	let isAlreadyPlanning = TypeOfForm === formType.edit_planning;
	let isNew = TypeOfForm === formType.new;

	const [isPlanMode, toggle] = useToggle(isAlreadyPlanning, [true, false]);
	const theform = useForm<IFilmFields>({
		initialValues: {
			name: isNew ? "" : (film?.name as string),
			is_watched: !isPlanMode,
			watched_on: isNew || isAlreadyPlanning ? new Date() : new Date(film?.watched_on?.toString() as string),
			rating: isNew ? 0 : film?.rating,
			comment: isNew ? "" : film?.comment,
		},
	});

	async function AddToList(values: IFilmFields) {
		let url;
		let bodydata;
		let method = "POST";
		switch (TypeOfForm) {
			case formType.new:
				url = "/api/filmlist/add";
				bodydata = { ...values, is_watched: !isPlanMode };
				break;
			case formType.edit_planning:
			case formType.edit_watched:
				method = "PUT";
				url = "/api/filmlist/update";
				bodydata = { id: film?.id, ...values, is_watched: !isPlanMode };
				break;
			default:
				url = "/api/misc/fail";
				bodydata = values;
				break;
		}

		let req = await fetch((process.env.API_URL as string) + url, {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify(bodydata),
		});
		let data = await req.json();
		if (data.success) alert("Film added to list");
	}

	return (
		<Paper p="xl" withBorder>
			<form onSubmit={theform.onSubmit(AddToList)}>
				<Stack>
					<TextInput
						required
						label="Title"
						value={theform.values.name}
						onChange={event => theform.setFieldValue("name", event.currentTarget.value)}
						data-autofocus
					/>
					<Checkbox checked={isPlanMode} label="Planning to Watch ??" onChange={() => toggle()} />
					{!isPlanMode && (
						<>
							<Group grow>
								<NumberInput
									label="Rating"
									placeholder="⭐ Give it a Rating"
									value={theform.values.rating as number}
									min={0}
									max={10}
									onChange={v => theform.setFieldValue("rating", v || 2)}
								/>
								<DatePicker
									placeholder="Pick the date"
									label="Watched it on"
									inputFormat="YYYY-MM-DD"
									value={theform.values.watched_on}
									onChange={v => theform.setFieldValue("watched_on", v || new Date())}
								/>
							</Group>
							<TextInput
								label="Comment"
								placeholder="What did you think about it ?"
								value={theform.values.comment as string}
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
