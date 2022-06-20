import fastify from "fastify";

import prismaPlugin from "./plugins/prisma";
import { profileRoutes } from "./routes/profile";

export const build = (opts = {}) => {
	const app = fastify(opts);

	app.register(prismaPlugin);

	app.register(profileRoutes, { prefix: "/api/profile" });

	return app;
};

// server
build({ logger: true }).listen({ port: parseInt(process.env.PORT || "3100") }, (err, address) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
});
