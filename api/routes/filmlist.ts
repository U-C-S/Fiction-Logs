import { film } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { createFilm, deleteFilmById, getFilms, updateFilm } from "../services/filmServices";
import { IFilm } from "../types/IFilm";
import { jwtUserPayload } from "../types/jwt";

export async function filmListRoutes(fastify: FastifyInstance) {
	// Get all list of films of a user
	fastify.get<{
		Reply: film[];
		Querystring: {
			name: string;
			watched?: string;
		};
	}>("/", async (request, reply) => {
		const { name, watched } = request.query;

		let result;
		if (watched === "true" || watched === "false") {
			result = await getFilms(name, watched === "true");
			fastify.log.info(`Get films of user ${name} with watched = ${watched}`);
		} else result = await getFilms(name);

		return reply.send(result);
	});

	fastify.get("/me", { onRequest: [fastify.authenticate] }, async (request, reply) => {
		const { username } = request.user as jwtUserPayload;
		const result = await getFilms(username);
		return reply.send(result);
	});

	fastify.post(
		"/add",
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

	fastify.delete(
		"/delete/:id",
		{
			onRequest: [fastify.authenticate],
		},
		async (request, reply) => {
			const { id } = request.params as { id: string };
			const { id: userId } = request.user as jwtUserPayload;

			const result = await deleteFilmById(userId, parseInt(id));

			return reply.send(result);
		}
	);

	// update film
	fastify.put(
		"/update",
		{
			onRequest: [fastify.authenticate],
		},
		async (request, reply) => {
			const { id: userId } = request.user as jwtUserPayload;
			const filmData = request.body as IFilm;

			const result = await updateFilm(userId, filmData);

			if (result.success) {
				return reply.send(result);
			} else {
				return reply.code(400).send(result);
			}
		}
	);
}
