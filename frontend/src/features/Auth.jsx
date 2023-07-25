import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const LoginUser = createAsyncThunk("/login", async(user, thunkAPI) => {

    axios.post("http://localhost:5000/login", {
        email: user.email,
        password: user.password
    })
    .then(res => {
      if(res.data.Status === 'Success') {
        return res.data;
      } else {
        return (res.data.Error)
      }
    })
    .then(err => console.log(err))

})

export const Logout = createAsyncThunk("/logout", async() => {
    await axios.delete("http://localhost:5000/logout");
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },

    extraReducers:(builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;