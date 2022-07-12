import { PrismaClient, profile } from "@prisma/client";
import { IQuery } from "../types/IQuery";

const prisma = new PrismaClient();

/**
 * The passwords should be hashed before pushing it into this
 */
export async function createProfile({ name, password, email }: any): IQuery<{
	id: number;
	name: string;
}> {
	try {
		let x = await prisma.profile.create({
			data: {
				name,
				password,
				email,
			},
			select: {
				id: true,
				name: true,
			},
		});

		return {
			success: true,
			data: x,
		};
	} catch (error: any) {
		return {
			success: false,
			message: error.message,
		};
	}
}

export async function getProfile(name: string, all: boolean = false, pswd: boolean = false): IQuery<any> {
	try {
		let x = await prisma.profile.findUniqueOrThrow({
			where: { name },
			select: {
				created_at: true,
				name: true,
				email: true,
				id: true,
				avatar: true,
				password: pswd,
				film: all
					? {
							select: {
								id: all,
								name: all,
								comment: all,
								is_watched: all,
								watched_on: all,
								rating: all,
							},
					  }
					: false,
			},
		});

		return {
			success: true,
			data: x,
		};
	} catch (error: any) {
		return {
			success: false,
			message: error.message,
		};
	}
}
