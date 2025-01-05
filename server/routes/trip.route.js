import express from "express";
import { createTrip ,fetchTrip} from "../controllers/trip.controllers.js";

const TripRoute = express.Router();


TripRoute.post("/create",createTrip)
TripRoute.get("/fetch-trip",fetchTrip)




export default TripRoute