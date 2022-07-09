import { buildFastifyServer } from "../app";
import test from "node:test";
import assert from "assert";

const app = buildFastifyServer();

test("Login and Get the logged-in's profile", async t => {
	let jwt: string;

	await t.test("Login check", async t => {
		let response = await app.inject({
			method: "POST",
			url: "/auth/login",
			payload: {
				name: "kitty",
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

test("Create a profile and Delete it", async t => {
	await t.test("Create profile check", async t => {
		let profileCreateRes = await app.inject({
			method: "POST",
			url: "/auth/register",
			payload: {
				name: "testx",
				password: "test",
				email: "test@test.com",
			},
		});

		assert.strictEqual(profileCreateRes.statusCode, 200);
	});

	await t.test("Delete profile check", async t => {
		let profileDeleteRes = await app.inject({
			method: "DELETE",
			url: "/api/profile/delete/test",
		});

		assert.strictEqual(profileDeleteRes.statusCode, 200);
	});
});
