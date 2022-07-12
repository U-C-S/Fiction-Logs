import { Center, Loader } from "@mantine/core";
import React from "react";

export function LoadingScreen({ style }: { style?: React.CSSProperties }) {
	return (
		<Center
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				...style,
			}}>
			<Loader color="red" variant="bars" />
		</Center>
	);
}
