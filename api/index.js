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
    cached.promise = mongoose.connect(uri).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

app.use(async (req, res, next) => {
  if (req.path.startsWith("/api")) {
    try {
      await connectDB();
    } catch (err) {
      console.error("DB connection error:", err.message);
    }
  }
  next();
});

app.use("/api/trip", TripRoute);

export default app;
