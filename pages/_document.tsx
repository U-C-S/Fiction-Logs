import { createGetInitialProps, createStylesServer } from "@mantine/next";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();
const stylesServer = createStylesServer();

export default class _Document extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}