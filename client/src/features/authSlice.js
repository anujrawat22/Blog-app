

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const apiurl = process.env.REACT_APP_API_URL

const initialState = {
    user: null,
    token: Cookies.get('token') || null,
    isAuthenticated: false,
    loading: false,
    error: null,
    role: null,
};


export const loginUser = createAsyncThunk("/users/login", async ({ data, extra: navigateCallback }) => {
    try {
        const response = await axios.post(`${apiurl}/users/login`, {
            ...data
        })

        Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have been Logged in!',
            showConfirmButton: false,
            timer: 1000
        });
        navigateCallback(response.data)
        Cookies.set('token', response.data.token)
        return response.data

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: error.response.data.err,
            showConfirmButton: false,
            timer: 1000
        });
        throw error.response.data.err;
    }
})

export const signupUser = createAsyncThunk("/users/signup", async (
    { data, extra: navigateCallback }
) => {
    try {
        const response = await axios.post(`${apiurl}/users/signup`, {
            ...data
        })

        Swal.fire({
            icon: 'success',
            title: 'Signup Successful',
            text: 'You have been Singed up!',
            showConfirmButton: false,
            timer: 1000
        });
        navigateCallback()
        return response.data
    } catch (error) {

        Swal.fire({
            icon: 'error',
            text: error.response.data.err,
            showConfirmButton: false,
            timer: 1000
        });
        throw error.response.data.err;
    }
})

export const Logout = createAsyncThunk("users/logout", async (_, { dispatch }) => {
    try {
        await axios.get(`${apiurl}/users/logout`);
        Cookies.remove('token')
        dispatch(authSlice.actions.logout())
    } catch (error) {
        console.error('Error clearing cookies:', error);
    }
})

export const autoLogin = createAsyncThunk('auth/autoLogin', async ({ token, navigateCallback }) => {
    try {
        const response = await axios.get(`${apiurl}/users/me`, {
            headers: { Authorization: `bearer ${token}` }
        })
        navigateCallback(response.data)
        return response.data;
    } catch (error) {
        throw error.response.data.err;
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.role = null;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token
                state.user = action.payload.user
                state.isAuthenticated = true
                state.role = action.payload.role
                state.loading = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(autoLogin.pending, (state) => {
                state.loading = true
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.loading = false;
                state.role = action.payload.role;
                state.user = action.payload.user;
                state.loading = false;
                state.token = action.payload.token
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
});



export const selectToken = (state) => state.auth.token

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
