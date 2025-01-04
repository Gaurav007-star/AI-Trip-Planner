import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const UserRegister = createAsyncThunk("user/register",async(userInfo)=>{
    try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token${userInfo?.access_token}`,{
            headers:{
                Authorization:`Bearer ${userInfo?.access_token}`,
                Accept:`Application/json`
            }
        })
        return response 
    } catch (error) {
        console.log("UserRegister ERROR : ",error.response);
        toast.error(error.response.message)
        return error.response
    }
});

const initialState = {
    user:JSON.parse(localStorage.getItem('user'))
}

const UserSlice = createSlice({
    name:"user",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(UserRegister.fulfilled,(state,action)=>{
            // console.log("AcTIONS:",action.payload.data);
            if(action.payload.status == 200){
                localStorage.setItem('user',JSON.stringify(action.payload.data))
                state.user = action.payload.data
            }
        })
    }
});

// export const {} = UserSlice.actions;
export default UserSlice.reducer;