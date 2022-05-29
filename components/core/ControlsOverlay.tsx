import { Affix, Button, Modal, Paper } from "@mantine/core";
import { useState } from "react";
import { Plus, Search } from "tabler-icons-react";
import AddFilmForm from "./AddFilmForm";

export function ControlsOverlay() {
	const [opened, setOpened] = useState(false);

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
				<AddFilmForm />
			</Modal>
		</Affix>
	);
}
