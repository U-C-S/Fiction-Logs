import { FastifyInstance } from "fastify";
import bcrypt from "@node-rs/bcrypt";

import { createProfile, getProfile } from "../services/profileServices";

export async function authRoutes(fastify: FastifyInstance) {
	let { prisma } = fastify;

	fastify.post("/login", async (request, reply) => {
		const { name, password } = request.body as any;

		const result = await getProfile(name);

		if (result.success && (await bcrypt.compare(password, result.data.password))) {
			return reply.send({
				success: true,
				message: "Success",
				data: {
					token: await reply.jwtSign({
						id: result.data.id as number,
						username: name,
					}),
					username: name,
				},
			});
		}

		return reply.code(403).send({
			success: false,
			message: "Invalid credentials",
		});
	});

	fastify.post("/register", async (request, reply) => {
		const { name, password, email } = request.body as any;

		let hashedpassword = await bcrypt.hash(password, 10);
		let profile = await createProfile({ name, password: hashedpassword, email });

		if (profile.success) {
			return reply.send({
				success: true,
				message: "Success",
				data: {
					token: await reply.jwtSign({
						id: profile.data?.id as number,
						username: name,
					}),
					username: name,
				},
			});
		}
		return reply.code(400).send({
			success: false,
			message: "Invalid credentials",
		});
	});

	fastify.delete("/delete/:name", async (request, reply) => {
		const { name } = request.params as { name: string };

		await prisma.film.deleteMany({
			where: {
				profile: {
					name,
				},
			},
		});

		await prisma.profile.delete({
			where: { name },
		});

		return reply.send({
			success: true,
			message: `${name} has deleted`,
		});
	});
}
