import test from "node:test";
import assert from "node:assert";
import { buildFastifyServer } from "../src/app";

test("Create a profile and Delete it", async t => {
	let app = buildFastifyServer();

	let profileCreateRes = await app.inject({
		method: "POST",
		url: "/api/profile/register",
		payload: {
			name: "test",
			password: "test",
			email: "test@test.com",
		},
	});

	await t.test("Create profile check", t => {
		assert.strictEqual(profileCreateRes.statusCode, 200);
	});

	let profileDeleteRes = await app.inject({
		method: "DELETE",
		url: "/api/profile/delete/test",
	});

	await t.test("Delete profile check", t => {
		assert.strictEqual(profileDeleteRes.statusCode, 200);
	});
});
