import { FastifyInstance } from "fastify";
import { jwtUserPayload } from "../../types/jwt";

export async function profileRoutes(fastify: FastifyInstance) {
	let { prisma } = fastify;

	fastify.get(
		"/",
		{
			onRequest: [fastify.authenticate],
		},
		async (request, reply) => {
			let id = (request.user as jwtUserPayload).id;
			const profile = await prisma.profile.findUnique({ where: { id } });

			if (!profile) {
				return reply.code(404).send({ message: "Profile not found" });
			}

			let { name, created_at, email } = profile;
			reply.code(200).send({
				succes: true,
				data: { id, name, created_at, email },
			});
		}
	);

	fastify.get("/:name", async (request, reply) => {
		const { name } = request.params as { name: string };

		const profile = await prisma.profile.findUnique({
			where: { name },
		});
		if (!profile) {
			return reply.code(404).send({
				success: false,
				message: "Profile not found",
			});
		}

		return reply.send({
			success: true,
			data: profile,
		});
	});
	/*
	fastify.post("/", async (request, reply) => {
		const { name, email, password } = request.body as any;
		let profile;
		try {
			profile = await prisma.profile.create({
				data: {
					name,
					email,
					password,
				},
			});
		} catch (error) {
			console.log(error);
			let x = await prisma.profile.count();
		}
		return profile;
	});
	*/
}
