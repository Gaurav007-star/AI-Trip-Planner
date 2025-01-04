import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import DataBase from "./config/db.js";
import TripModal from "./models/trip.model.js";

const app = express();
app.use(morgan("dev"));

app.listen(8000, () => {
  console.log("Listining 8000");
  DataBase();
});
