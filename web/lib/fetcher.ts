export async function fetcher(...args: [string, RequestInit?]) {
	let x = await fetch(process.env.API_URL + args[0], args[1]);
	return await x.json();
}

export async function fetcherWithAuth(args: string | null) {
	if (args === null) return;

	let x = await fetch(process.env.API_URL + args, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
			contentType: "application/json",
		},
	});

	return await x.json();
}
