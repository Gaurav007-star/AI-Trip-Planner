import express from "express";
import { createTrip ,fetchAllTrip,singleTrip} from "../controllers/trip.controllers.js";

const TripRoute = express.Router();


TripRoute.post("/create",createTrip)
TripRoute.get("/fetch-trip/:email",fetchAllTrip)
TripRoute.get("/fetch-one-trip/:id",singleTrip)






export default TripRoute