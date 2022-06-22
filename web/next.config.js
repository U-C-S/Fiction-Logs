const { join } = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [join(__dirname, "styles")],
	},
	env: {
		API_URL: "http://localhost:3100",
	},
};

module.exports = nextConfig;
