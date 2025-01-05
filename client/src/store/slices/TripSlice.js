import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const TripCreateThunk = createAsyncThunk("create/trip", async (data) => {
  try {
   const response = await axios.post("http://localhost:8000/trip/create", data);
   return response.data
  } catch (error) {
    toast.error(error.response.data.message || "error find 😶")
    return null;
  }
});

const initialState = {
  trip: {}
};

const TripSlice = createSlice({
  name: "trip",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(TripCreateThunk.fulfilled, (state, action) => {
      if(action.payload){
        state.trip = action.payload
      }
    });
  }
});

export default TripSlice.reducer;
