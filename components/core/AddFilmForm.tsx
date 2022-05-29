import { Paper, TextInput, Group, NumberInput, Button, Stack, Checkbox } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useToggle } from "@mantine/hooks";
import React from "react";

export default function AddFilmForm() {
	const [type, toggle] = useToggle("Watched", ["Watched", "Planning"]);

	return (
		<Paper p="xl" withBorder>
			<form>
				<Stack>
					<TextInput required label="Title" />
					<Checkbox checked={type === "Planning"} label="Planning to Watch ??" onChange={() => toggle()} />
					{type === "Watched" && (
						<>
							<Group grow>
								<NumberInput label="Rating" placeholder="⭐ Give it a Rating" min={0} max={10} />
								<DatePicker placeholder="Pick the date" label="Watched it on" inputFormat="YYYY-MM-DD" />
							</Group>
							<TextInput label="Comment" placeholder="What did you think about it ?" />
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
