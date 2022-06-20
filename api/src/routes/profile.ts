import { PrismaClient } from "@prisma/client";
import fastify, { FastifyInstance } from "fastify";

const prisma = new PrismaClient();

export async function profileRoutes(fastify: FastifyInstance) {
	fastify.get("/", async (request, reply) => {
		const profiles = await prisma.profile.findMany();
		return profiles;
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
