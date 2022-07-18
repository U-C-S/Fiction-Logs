import Fastify from "fastify";
import * as dotenv from "dotenv";
import init from "./app";

dotenv.config();

const app = Fastify();

app.register(init);
app.get("/", async (request, reply) => {
	reply.send({ message: "Hello from ficition-logs api" });
});

export default async (req: any, res: any) => {
	await app.ready();
	app.server.emit("request", req, res);
};