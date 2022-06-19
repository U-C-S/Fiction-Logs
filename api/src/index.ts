import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

prisma.profile
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
			prisma.profile.count().then(count => {
				console.log("Count: ", count);
			});
		}
	);
