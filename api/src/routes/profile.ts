import { FastifyInstance } from "fastify";

export async function profileRoutes(fastify: FastifyInstance) {
	let { prisma } = fastify;

	fastify.get("/", async (request, reply) => {
		const profiles = await prisma.profile.findMany();
		return profiles;
	});

	fastify.get("/:name", async (request, reply) => {
		const { name } = request.params as { name: string };

		const profile = await prisma.profile.findUnique({
			where: { name ,},
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
}
