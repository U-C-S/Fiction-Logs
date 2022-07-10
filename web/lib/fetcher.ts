export async function fetcher(...args: [string, RequestInit?]) {
	let x = await fetch(process.env.API_URL + args[0], args[1]);
	return await x.json();
}

export async function fetcherWithAuth(...args: [string | null, RequestInit?]) {
	if (args[0] === null) return;

	let x = await fetch(process.env.API_URL + args[0], {
		method: args[1]?.method && "GET",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
			...args[1]?.headers,
		},
		body: args[1]?.body,
	});

	let data = await x.json();
	if (data.success) {
		return data;
	} else {
		throw new Error(data.message);
	}
}
