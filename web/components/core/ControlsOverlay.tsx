import { ActionIcon, Affix, Button, Divider, Modal, Paper, Transition } from "@mantine/core";
import { useState } from "react";
import { Home2, Plus, Settings } from "tabler-icons-react";
import FilmForm from "./FilmForm";

export function ControlsOverlay() {
	const [opened, setOpened] = useState(false);

	return (
		<Affix position={{ bottom: 20 }} style={{ width: "100%" }}>
			<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
				<Paper shadow="xs" p="xs" withBorder>
					<div
						style={{
							display: "flex",
							justifyContent: "space-around",
							alignItems: "center",
							columnGap: "0.8rem",
						}}>
						<ActionIcon p={5} variant="hover" size="lg" color={"indigo"}>
							<Home2 />
						</ActionIcon>
						<Button leftIcon={<Plus />} onClick={() => setOpened(true)} color={"indigo"}>
							Add
						</Button>
						{/* <Divider orientation="vertical" style={{ width: "1px", height: "36px" }} /> */}
						<ActionIcon p={5} variant="hover" size="lg" color={"indigo"}>
							<Settings />
						</ActionIcon>
					</div>
				</Paper>
			</div>

			<Modal
				title="Want to add something ?"
				opened={opened}
				onClose={() => setOpened(false)}
				centered
				overlayBlur={1}
				transition="pop"
				transitionDuration={350}
				transitionTimingFunction="ease">
				<FilmForm />
			</Modal>
		</Affix>
	);
}
