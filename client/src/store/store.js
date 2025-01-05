import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import TripSlice from "./slices/TripSlice";

const Store = configureStore({
    reducer:{
        user:UserSlice,
        trip:TripSlice
    }
});

export default Store;