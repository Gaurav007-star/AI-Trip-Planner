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
      return res.status(200).json({
        success: true,
        tripDetails: []
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

export const generateTrip = async (req, res) => {
  const { prompt, email, choice } = req.body;

  if (!prompt || !email || !choice) {
    return res.status(400).json({
      message: "Please provide all data: prompt, email, choice"
    });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "google/gemma-4-31b-it:free",
          messages: [
            {
              role: "system",
              content: `You are a travel itinerary generator. Always respond with valid JSON only. Do NOT use markdown code blocks or any formatting — return raw JSON.

You MUST follow this exact JSON schema:

{
  "location": "string (city/country name)",
  "duration_days": number,
  "budget": "string",
  "traveler_count": number,
  "hotel_options": [
    {
      "hotel_name": "string",
      "hotel_address": "string",
      "price": "string (include currency)",
      "hotel_image_url": "string",
      "geo_coordinates": { "latitude": number, "longitude": number },
      "rating": number,
      "descriptions": "string (1-2 sentences)"
    }
  ],
  "itinerary": [
    {
      "day": number,
      "plan": [
        {
          "time": "string (12-hour format e.g. 09:00 AM)",
          "placeName": "string",
          "placeDetails": "string (10-20 words)",
          "placeImageUrl": "string",
          "geoCoordinates": { "latitude": number, "longitude": number },
          "ticketPricing": "string (include currency or Free)",
          "travelTime": "string (e.g. 20-30 minutes)"
        }
      ]
    }
  ]
}

Generate hotel_options (2-4 hotels) and exactly as many itinerary days as the user requests with 2-4 places per day.`
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 4096
        })
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`OpenRouter API error ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ message: "AI returned empty response" });
    }

    const cleaned = content
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    let tripData;
    try {
      tripData = JSON.parse(cleaned);
    } catch {
      return res.status(500).json({ message: "AI response was not valid JSON" });
    }

    const createTrip = await TripModal.create({
      trip: tripData,
      choice,
      email
    });

    return res.status(201).json({
      success: true,
      trip: createTrip
    });
  } catch (error) {
    console.error("Generate trip error:", error.message);
    const msg = error.message;
    let friendly = msg;
    if (msg.includes("429")) {
      friendly = "AI service is temporarily rate-limited. Please wait a moment and try again.";
    } else if (msg.includes("401") || msg.includes("403")) {
      friendly = "AI service authentication failed. Please check the API key.";
    } else if (msg.includes("500") || msg.includes("502") || msg.includes("503")) {
      friendly = "AI service is currently unavailable. Please try again later.";
    }
    return res.status(500).json({
      success: false,
      message: friendly
    });
  }
};

export const deleteTrip = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid trip ID" });
  }

  try {
    const deleted = await TripModal.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }
    return res.status(200).json({ success: true, message: "Trip deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
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
