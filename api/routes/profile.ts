import { FastifyInstance } from "fastify";
import { getProfile } from "../services/profileServices";
import { jwtUserPayload } from "../types/jwt";

export async function profileRoutes(fastify: FastifyInstance) {
	fastify.get(
		"/me",
		{
			onRequest: [fastify.authenticate],
		},
		async (request, reply) => {
			let name = (request.user as jwtUserPayload).username;
			const result = await getProfile(name);

			return reply.code(result.success ? 200 : 400).send(result);
		}
	);

	fastify.get(
		"/me/all",
		{
			onRequest: [fastify.authenticate],
		},
		async (request, reply) => {
			let name = (request.user as jwtUserPayload).username;

			const result = await getProfile(name, true);

			return reply.code(result.success ? 200 : 400).send(result);
		}
	);

	fastify.get("/byname/:name", async (request, reply) => {
		const { name } = request.params as { name: string };

		const result = await getProfile(name);

		return reply.code(result.success ? 200 : 400).send(result);
	});

	fastify.get("/byname/:name/all", async (request, reply) => {
		const { name } = request.params as { name: string };

		const result = await getProfile(name, true);

		return reply.code(result.success ? 200 : 400).send(result);
	});
}
