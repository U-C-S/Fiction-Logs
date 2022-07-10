import fastifyCors from "@fastify/cors";
import fastify, { FastifyServerOptions } from "fastify";

import prismaPlugin from "./plugins/prisma";
import { filmListRoutes } from "./routes/filmlist";
import { profileRoutes } from "./routes/profile";
import { authRoutes } from "./routes/auth";
import jwtPlugin from "./plugins/jwt-auth";

export function buildFastifyServer(opts: FastifyServerOptions = {}) {
	const app = fastify(opts);

	app.register(jwtPlugin);
	app.register(prismaPlugin);
	app.register(fastifyCors, {
		methods: ["GET", "POST", "PUT", "DELETE"],
		origin: "*",
	});

	app.register(profileRoutes, { prefix: "/api/profile" });
	app.register(filmListRoutes, { prefix: "/api/filmlist" });
	app.register(authRoutes, { prefix: "/auth" });

	return app;
}