import TripModal from "../models/trip.model.js";

export const createTrip = async (req, res) => {
  // trip,choice,email
  console.log(req.body);
  
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
      message: "Trip create successfully 🫡"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
