import express from "express";
import { createTrip ,fetchAllTrip,singleTrip,generateTrip,deleteTrip} from "../controllers/trip.controllers.js";

const TripRoute = express.Router();


TripRoute.post("/create",createTrip)
TripRoute.post("/generate",generateTrip)
TripRoute.get("/fetch-trip/:email",fetchAllTrip)
TripRoute.get("/fetch-one-trip/:id",singleTrip)
TripRoute.delete("/delete/:id",deleteTrip)

export default TripRoute