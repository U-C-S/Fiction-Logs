import { Center, Loader } from "@mantine/core";
import React from "react";

export function LoadingScreen() {
	return (
		<Center
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<Loader color="red" variant="bars" />
		</Center>
	);
}
