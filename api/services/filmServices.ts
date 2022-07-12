import { film, PrismaClient, profile } from "@prisma/client";
import { IFilm } from "../types/IFilm";
import { IQuery } from "../types/IQuery";

const prisma = new PrismaClient();

/**
 * @param profilename just name of profile to get his films
 * @param is_watched if not used, returns all films of the user
 * @returns films of the user
 */
export async function getFilms(profilename: string, is_watched?: boolean): Promise<film[]> {
	return await prisma.film.findMany({
		where: {
			AND: [
				{
					profile: { name: { equals: profilename } },
					is_watched: is_watched === undefined ? undefined : { equals: is_watched === true }, // if is_watched is undefined, then get all films
				},
			],
		},
	});
}

export async function checkFilm(profileId: number, filmId: number) {
	return prisma.film.findFirstOrThrow({
		where: {
			AND: [
				{
					id: filmId,
					watched_by: profileId,
				},
			],
		},
	});
}

export async function createFilm(
	profilename: string,
	film: IFilm
): IQuery<{
	id: number;
	name: string;
}> {
	try {
		let x = await prisma.film.create({
			data: {
				name: film.name,
				is_watched: film.is_watched,
				comment: film.comment,
				rating: film.is_watched ? film.rating : null,
				watched_on: film.is_watched ? new Date(film.watched_on?.toString() as string) : null,
				profile: {
					connect: { name: profilename },
				},
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

export async function updateFilm(userId: number, film: IFilm): IQuery<null> {
	// maybe use prisma.$queryRaw
	try {
		let findTheFilm = await checkFilm(userId, film.id);

		await prisma.film.update({
			where: {
				id: findTheFilm.id,
			},
			data: {
				name: film.name,
				is_watched: film.is_watched,
				comment: film.comment,
				rating: film.is_watched ? film.rating : null,
				watched_on: film.is_watched ? new Date(film.watched_on?.toString() as string) : null,
			},
		});

		return {
			success: true,
			data: null,
		};
	} catch (error: any) {
		return {
			success: false,
			message: error.message,
		};
	}
}

export async function deleteFilmById(userId: number, filmId: number): IQuery<null> {
	try {
		let x = await checkFilm(userId, filmId);

		await prisma.film.delete({
			where: {
				id: x.id,
			},
		});

		return {
			success: true,
			data: null,
		};
	} catch (error: any) {
		return {
			success: false,
			message: error.message,
		};
	}
}
