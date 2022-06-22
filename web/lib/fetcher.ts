export async function fetcher(...args: [string, RequestInit?]) {
	let x = await fetch(process.env.API_URL + args[0], args[1]);
	return await x.json();
}
