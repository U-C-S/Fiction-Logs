import { film } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { jwtUserPayload } from "../types/jwt";

export async function filmListRoutes(fastify: FastifyInstance) {
	let { prisma } = fastify;

	// Get all list of films of a user
	fastify.get<{
		Reply: {
			success: boolean;
			data: film[] | any;
			message: string;
		};
		Params: {
			name: string;
		};
		Querystring: {
			watched?: string;
		};
	}>("/:name", async (request, reply) => {
		const { name } = request.params;
		const { watched } = request.query;

		const films = await prisma.film.findMany({
			where: {
				AND: [
					{
						profile: { name: { equals: name } },
						is_watched: { equals: watched == "true" },
					},
				],
			},

			select: {
				name: true,
				created_at: true,
				is_watched: true,
				watched_on: watched == "true" ? true : false,
				comment: watched == "true" ? true : false,
				rating: watched == "true" ? true : false,
			},
		});

		return reply.send({
			success: true,
			message: "Success" + name,
			data: films,
		});
	});

	fastify.post(
		"/",

		{
			onRequest: [fastify.authenticate],
		},

		async (request, reply) => {
			const { id } = request.user as jwtUserPayload;
			const { filmname } = request.body as any;

			const film = await prisma.film.create({
				data: {
					name: filmname,
					is_watched: false,
					profile: {
						connect: { id },
					},
				},
			});

			return reply.send({
				success: true,
				message: `${film.name} has added to ${id}`,
			});
		}
	);

	fastify.delete("/:name", async (request, reply) => {
		const { name } = request.params as { name: string };
		const { filmname } = request.body as any;

		await prisma.profile.update({
			where: { name: name },
			data: {
				film: {
					delete: {
						name: filmname,
					},
				},
			},
		});

		return reply.send({
			success: true,
			message: `${filmname} has deleted from ${name}`,
		});
	});

	// update film
	fastify.put("/:name", async (request, reply) => {
		const { name } = request.params as { name: string };
		const { filmname } = request.body as any;

		await prisma.film.update({
			where: { name: filmname },
			data: {
				is_watched: true,
				watched_on: new Date(),
				comment: "",
				rating: 0,
				profile: {
					connect: { name: name },
				},
			},
		});

		return reply.send({
			success: true,
			message: `${filmname} has updated to ${name}`,
		});
	});
}
