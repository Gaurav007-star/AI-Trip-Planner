import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const TripCreateThunk = createAsyncThunk("create/trip", async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/trip/generate`,
      data
    );
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message;
    if (msg) {
      toast.error(msg);
    } else if (error.code === "ERR_NETWORK") {
      toast.error("Cannot reach the server. Please check your connection.");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    return null;
  }
});

export const FetchTripThunk = createAsyncThunk("fetch/trip", async (email) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trip/fetch-trip/${email}`
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
      `${BASE_URL}/trip/fetch-one-trip/${id}`
    );

    return response.data;
  } catch (error) {

    toast.error(error.response.data.message || "error find 😶");
    return null;
  }
});

export const DeleteTripThunk = createAsyncThunk("delete/trip", async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/trip/delete/${id}`
    );
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete trip");
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
      })
      .addCase(DeleteTripThunk.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success("Trip deleted successfully");
          const deletedId = action.meta.arg;
          if (Array.isArray(state.allTrip)) {
            state.allTrip = state.allTrip.filter((t) => t._id !== deletedId);
          } else {
            state.allTrip = {};
          }
        }
      });
  }
});

export const { setEmptyTrip } = TripSlice.actions;
export default TripSlice.reducer;
