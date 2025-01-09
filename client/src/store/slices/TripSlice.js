import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const TripCreateThunk = createAsyncThunk("create/trip", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/trip/create",
      data
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "error find 😶");
    return null;
  }
});

export const FetchTripThunk = createAsyncThunk("fetch/trip", async (email) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/trip/fetch-trip/${email}`
    );
    return response.data;
  } catch (error) {

    toast.error(error.response.data.message || "error find 😶");
    return null;
  }
});

export const GetTripById = createAsyncThunk("fetch-single/trip", async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/trip/fetch-one-trip/${id}`
    );
    // console.log("TRIP DATA", response.data);

    return response.data;
  } catch (error) {
    // console.log("ERROR", error);

    toast.error(error.response.data.message || "error find 😶");
    return null;
  }
});

const initialState = {
  trip: {},
  allTrip: {}
};

const TripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setEmptyTrip(state) {
      state.trip = {};
      state.allTrip = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TripCreateThunk.fulfilled, (state, action) => {
        if (action.payload) {
          // console.log("Trip create details", action.payload.trip);
          state.trip = action.payload.trip;
        }
      })
      .addCase(FetchTripThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.allTrip = action.payload.tripDetails;
        }
      })
      .addCase(GetTripById.fulfilled, (state, action) => {
        if (action.payload) {
          // console.log("Single trip : ", action.payload);
          state.trip = action.payload.trip;
        }
        // state.trip = action.payload.trip;
      });
  }
});

export const { setEmptyTrip, goToTrip } = TripSlice.actions;
export default TripSlice.reducer;
