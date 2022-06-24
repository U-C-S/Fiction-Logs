import { FastifyInstance } from "fastify";
import bcrypt from "@node-rs/bcrypt";

export async function authRoutes(fastify: FastifyInstance) {
	let { prisma } = fastify;

	fastify.post("/login", async (request, reply) => {
		const { name, password } = request.body as any;

		const profile = await prisma.profile.findUnique({
			where: { name },
		});

		let code: number;
		if (!profile) code = 404;
		else if (!(await bcrypt.compare(password, profile.password))) code = 403;
		else code = 200;

		if (code != 200) {
			return reply.code(code).send({
				success: false,
				message: "Invalid credentials",
			});
		}

		return reply.send({
			success: true,
			message: "Success",
			data: {
				token: await reply.jwtSign({
					id: profile?.id as number,
					username: name,
				}),
			},
		});
	});

	fastify.post("/register", async (request, reply) => {
		const { name, password, email } = request.body as any;

		await prisma.profile.create({
			data: {
				name,
				password: await bcrypt.hash(password, 8),
				email,
			},
		});

		return reply.send({
			success: true,
			message: "Success",
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
