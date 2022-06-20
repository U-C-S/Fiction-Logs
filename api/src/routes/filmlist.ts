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
		const filmname = (await request.body) as string; //filmName

		const profile = await prisma.profile.update({
			where: {
				name: name,
			},
			data: {
				film: {
					create: {
						name: filmname,
						is_watched: false,
					},
				},
			},
		});

		return reply.send({
			success: true,
			message: `${profile.name} has added ${filmname}`,
		});
	});
}
