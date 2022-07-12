import { ActionIcon, Affix, Button, Divider, Modal, Paper, Transition } from "@mantine/core";
import Router from "next/router";
import { useContext, useState } from "react";
import { Home2, Plus, Settings } from "tabler-icons-react";
import { formType } from "../../types/film";
import { AuthContext } from "../context/AuthContext";
import { FilmForm } from "./FilmForm";

export function ControlsOverlay() {
	const { authData } = useContext(AuthContext);
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
						{authData ? (
							<>
								<ActionIcon
									p={5}
									variant="hover"
									size="lg"
									color={"indigo"}
									onClick={() => Router.push("/me")}>
									<Home2 />
								</ActionIcon>
								<Button leftIcon={<Plus />} onClick={() => setOpened(true)} color={"indigo"}>
									Add
								</Button>
								<ActionIcon p={5} variant="hover" size="lg" color={"indigo"}>
									<Settings />
								</ActionIcon>
							</>
						) : (
							<Button leftIcon={<Plus />} onClick={() => Router.push("/")} color={"indigo"}>
								Authenticate
							</Button>
						)}
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
				<FilmForm TypeOfForm={formType.new} />
			</Modal>
		</Affix>
	);
}
