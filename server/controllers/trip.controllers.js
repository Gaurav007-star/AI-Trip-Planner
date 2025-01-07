import TripModal from "../models/trip.model.js";
import mongoose from "mongoose";

export const createTrip = async (req, res) => {
  // trip,choice,email
  // console.log(req.body);

  const { trip, choice, email } = req.body;

  try {
    if (!trip || !choice || !email) {
      return res.status(400).json({
        message: "Provide provide all data"
      });
    }

    const createTrip = await TripModal.create({
      trip,
      choice,
      email
    });

    return res.status(201).json({
      success: true,
      trip: createTrip
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const fetchAllTrip = async (req, res) => {
  // console.log("params ",req.params.id);
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({
      message: "Please provide the value"
    });
  }

  try {
    const tripDetails = await TripModal.find({
      email
    });

    if (!tripDetails.length) {
      return res.status(400).json({
        success: false,
        message: "User do not create any trip😑"
      });
    }

    return res.status(200).json({
      success: true,
      tripDetails
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const singleTrip = async (req, res) => {
  let id = req.params.id;
  console.log("ID : ",id);
  
  try {
    const trip_details = await TripModal.findOne({
      _id: id
    });

    if (!trip_details) {
      return res.status(400).json({
        success: false,
        message: "Trip not found"
      });
    }

    return res.status(200).json({
      success: true,
      trip: trip_details
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Trip is not found 😗"
    });
  }
};
