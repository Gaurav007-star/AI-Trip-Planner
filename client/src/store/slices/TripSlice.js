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
      `http://localhost:8000/trip/fetch-trip/${email}`,
    );
    return response.data;
  } catch (error) {
    console.log("ERROR",error.response);
    
    toast.error(error.response.data.message || "error find 😶");
    return null;
  }
});

const initialState = {
  trip: {}
};

const TripSlice = createSlice({
  name: "trip",
  initialState,
  reducers:{
    setEmptyTrip(state){
      state.trip = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(TripCreateThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.trip = action.payload;
        }
      })
      .addCase(FetchTripThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.trip = action.payload.tripDetails;
        }
      });
  }
});

export const {setEmptyTrip} = TripSlice.actions
export default TripSlice.reducer;
