import { Affix, Button, createStyles, Modal, NumberInput, Paper, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { Plus, Search } from "tabler-icons-react";

export function ControlsOverlay() {
	const [opened, setOpened] = useState(false);

	return (
		<Affix position={{ bottom: 20 }} style={{ width: "100%" }}>
			<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
				<Paper shadow="xs" radius="md" p="xs" withBorder>
					<div style={{ display: "flex", justifyContent: "space-around", columnGap: "1rem" }}>
						<Button leftIcon={<Plus />} onClick={() => setOpened(true)}>
							Add
						</Button>
						<Button leftIcon={<Search />}>Search</Button>
					</div>
				</Paper>
			</div>

			<Modal opened={opened} onClose={() => setOpened(false)} title="Want to add something ?" centered>
				<Paper radius="md" p="xl" withBorder>
					<form>
						<TextInput required label="Title" />
						<NumberInput label="Rating" min={0} max={10} />
						<DatePicker placeholder="Pick the date" label="Watched it on" inputFormat="YYYY-MM-DD" />
					</form>
				</Paper>
			</Modal>
		</Affix>
	);
}
