import { FastifyInstance } from "fastify";
import { getProfile } from "../services/profileServices";
import { jwtUserPayload } from "../types/jwt";

export async function profileRoutes(fastify: FastifyInstance) {
	fastify.get(
		"/",
		{
			onRequest: [fastify.authenticate],
		},
		async (request, reply) => {
			let name = (request.user as jwtUserPayload).username;
			const result = await getProfile(name);

			if (!result.success) {
				return reply.code(404).send({ message: "Profile not found" });
			}

			let { created_at, email } = result.data;
			reply.code(200).send({
				succes: true,
				data: { name, created_at, email },
			});
		}
	);

	fastify.get("/:name", async (request, reply) => {
		const { name } = request.params as { name: string };

		const profile = await getProfile(name);

		if (!profile.success) {
			return reply.code(404).send({
				success: false,
				message: "Profile not found",
			});
		}

		return reply.send(profile);
	});
}
