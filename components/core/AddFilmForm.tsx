import { Paper, TextInput, Group, NumberInput, Button, Stack, Checkbox } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, useToggle } from "@mantine/hooks";
import React, { useContext } from "react";
import { IFilmData, ProfileContext } from "../../lib/profileContext";

export default function AddFilmForm() {
	const [type, toggle] = useToggle("Watched", ["Watched", "Planning"]);
	const profile = useContext(ProfileContext);
	const theform = useForm<IFilmData>({
		initialValues: {
			title: "",
			watchedOn: new Date(),
			rating: 0,
			comment: "",
		},
	});

	function AddToList(values: IFilmData) {
		profile.updateWatchList((c: any) => [...c, values]);
	}

	return (
		<Paper p="xl" withBorder>
			<form onSubmit={theform.onSubmit(AddToList)}>
				<Stack>
					<TextInput
						required
						label="Title"
						value={theform.values.title}
						onChange={event => theform.setFieldValue("title", event.currentTarget.value)}
					/>
					<Checkbox checked={type === "Planning"} label="Planning to Watch ??" onChange={() => toggle()} />
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
