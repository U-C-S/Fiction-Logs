import { film } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { createFilm, getFilms, updateFilm } from "../services/filmServices";
import { IFilm } from "../types/IFilm";
import { jwtUserPayload } from "../types/jwt";

export async function filmListRoutes(fastify: FastifyInstance) {
	let { prisma } = fastify;

	// Get all list of films of a user
	fastify.get<{
		Reply: film[];
		Params: {
			name: string;
		};
		Querystring: {
			watched?: string;
		};
	}>("/:name", async (request, reply) => {
		const { name } = request.params;
		const { watched } = request.query;

		const result = await getFilms(name, watched === "true");

		return reply.send(result);
	});

	fastify.post(
		"/",
		{
			onRequest: [fastify.authenticate],
		},

		async (request, reply) => {
			const { username } = request.user as jwtUserPayload;
			const filmData = request.body as IFilm;

			const result = await createFilm(username, filmData);

			if (result.success) {
				return reply.send(result);
			} else {
				return reply.code(400).send(result);
			}
		}
	);

	/*
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
	*/

	// update film
	fastify.put(
		"/update",
		{
			onRequest: [fastify.authenticate],
		},
		async (request, reply) => {
			const { username } = request.user as jwtUserPayload;
			const filmData = request.body as IFilm;
			

			const result = await updateFilm(filmData);

			if (result.success) {
				return reply.send(result);
			} else {
				return reply.code(400).send(result);
			}
		}
	);
}
