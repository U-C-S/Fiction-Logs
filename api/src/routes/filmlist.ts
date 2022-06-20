import { FastifyInstance } from "fastify";

export async function filmListRoutes(fastify: FastifyInstance) {
	let { prisma } = fastify;

	fastify.get("/:name", async (request, reply) => {
		const { name } = request.params as any;
		const { watched } = request.query as any;

		const films = await prisma.film.findMany({
			where: {
				AND: [
					{
						name: { equals: name },
						is_watched: { equals: watched },
					},
				],
			},
			select: {
				name: true,
				created_at: true,
				comment: watched ? true : false,
				rating: watched ? true : false,
				watched_on: watched ? true : false,
			},
		});

		return reply.send({
			success: true,
			message: "Success",
			data: films,
		});
	});

	fastify.post("/:name", async (request, reply) => {
		const { name } = request.params as { name: string };
		const { filmname } = request.body as any;

		const film = await prisma.film.create({
			data: {
				name: filmname,
				is_watched: false,
				profile: {
					connect: { name: name },
				},
			},
		});

		return reply.send({
			success: true,
			message: `${film.name} has added to ${name}`,
		});
	});
}