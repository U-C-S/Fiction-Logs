import { FastifyInstance } from "fastify";
import { hashSync } from "@node-rs/bcrypt";

export async function authRoutes(fastify: FastifyInstance) {
	let { prisma } = fastify;

	fastify.post("/login", async (request, reply) => {
		const { name, password } = request.body as any;

		const profile = await prisma.profile.findUnique({
			where: { name },
		});

		let code: number;
		if (!profile) code = 404;
		else if (profile?.password !== password) code = 403;
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
					username: profile?.name as string,
				}),
			},
		});
	});

	fastify.post("/register", async (request, reply) => {
		const { name, password, email } = request.body as any;

		await prisma.profile.create({
			data: {
				name,
				password: hashSync(password, 10),
				email,
			},
		});

		return reply.send({
			success: true,
			message: "Success",
		});
	});
}
