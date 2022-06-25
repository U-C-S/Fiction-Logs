import { buildFastifyServer } from "../app";
import test from "node:test";
import assert from "assert";

test("Login", async t => {
	const app = buildFastifyServer();

	let jwt: string;

	await t.test("Login check", async t => {
		let response = await app.inject({
			method: "POST",
			url: "/auth/login",
			payload: {
				name: "kitty2",
				password: "meow",
			},
		});

		assert.strictEqual(response.statusCode, 200);
		jwt = JSON.parse(response.body)?.data?.token;
	});

	await t.test("Get the profile check", async t => {
		let response = await app.inject({
			method: "GET",
			url: "/api/profile",
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});

		assert.strictEqual(response.statusCode, 200);
		assert.strictEqual(JSON.parse(response.body).data.name, "kitty");
	});
});
