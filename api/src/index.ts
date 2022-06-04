import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

prisma.profiles
	.create({
		data: {
			name: "John Doe",
			email: "johndoe@what.com",
			password: "12345612",
		},
	})
	.then(
		profile => {
			console.log(profile);
		},
		err => {
			prisma.profiles.count().then(count => {
				console.log("Count: ", count);
			});
		}
	);
