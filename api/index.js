import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import TripRoute from "../server/routes/trip.route.js";

const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let cached = global._mongooseCache;
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const uri = `${process.env.MONGO}/tripinfo`;
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

app.use(async (_req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection error:", err.message);
  }
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    db: cached.conn ? "connected" : "disconnected",
    env: {
      hasMongo: !!process.env.MONGO,
      hasOpenRouter: !!process.env.OPENROUTER_API_KEY,
    },
  });
});

app.use("/api/trip", TripRoute);

app.all("/api/*", (_req, res) => {
  res.status(404).json({ message: "API route not found" });
});

export default app;
