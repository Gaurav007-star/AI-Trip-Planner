import express from "express";
import { createTrip } from "../controllers/trip.controllers.js";

const TripRoute = express.Router();


TripRoute.post("/create",createTrip)



export default TripRoute