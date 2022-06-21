import { FastifyInstance } from "fastify";

export async function authRoutes(fastify: FastifyInstance) {
	let { prisma } = fastify;

	fastify.get("/login", async (request, reply) => {
		const { name, password } = request.body as any;

		const profile = await prisma.profile.findUnique({
			where: { name },
		});

		if (profile?.password != password) {
			return reply.send({
				success: false,
				message: "Wrong username or password",
			});
		}

		return reply.send({
			success: true,
			message: "Success",
			data: profile,
		});
	});
}
