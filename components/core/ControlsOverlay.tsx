import { Affix, Button, Checkbox, Group, Modal, NumberInput, Paper, Stack, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useToggle } from "@mantine/hooks";
import { useState } from "react";
import { Plus, Search } from "tabler-icons-react";

export function ControlsOverlay() {
	const [opened, setOpened] = useState(false);
	const [type, toggle] = useToggle("Watched", ["Watched", "Planning"]);

	return (
		<Affix position={{ bottom: 20 }} style={{ width: "100%" }}>
			<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
				<Paper shadow="xs" p="xs" withBorder>
					<div style={{ display: "flex", justifyContent: "space-around", columnGap: "1rem" }}>
						<Button leftIcon={<Plus />} onClick={() => setOpened(true)}>
							Add
						</Button>
						<Button leftIcon={<Search />}>Search</Button>
					</div>
				</Paper>
			</div>

			<Modal opened={opened} onClose={() => setOpened(false)} title="Want to add something ?">
				<Paper p="xl" withBorder>
					<form>
						<Stack>
							<TextInput required label="Title" />
							<Checkbox
								checked={type === "Planning"}
								label="Planning to Watch ??"
								onChange={() => toggle()}
							/>
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
			</Modal>
		</Affix>
	);
}
