import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { z } from "zod";

const env = z.object({
  PORT: z.coerce.number().default(4000),
  CORS_ALLOWED_ORIGINS: z.string().default("http://localhost:5173,http://localhost:5174,http://localhost:3000")
}).parse(process.env);

const allowedOrigins = env.CORS_ALLOWED_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean);
const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) => res.json({ status: "ok", service: "taxi-api" }));
app.get("/api/v1", (_req, res) => res.json({ name: "Taxi Booking API", version: "0.1.0" }));

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: allowedOrigins, credentials: true } });

// Socket events must be authenticated before enabling booking or GPS channels.
io.on("connection", (socket) => {
  socket.emit("server:ready", { connected: true });
});

httpServer.listen(env.PORT, () => {
  console.log(`Taxi API listening on port ${env.PORT}`);
});
