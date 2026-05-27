import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../types/user";

type InitialState = {
    loading: boolean
    user: User | null
    errorMessage: string | null
    authToken: string | null
}

const initialState: InitialState = {
    loading: false,
    user: null,
    errorMessage: null,
    authToken:  null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

        authRequest: (state) => {
            state.loading = true
            state.errorMessage = null
        },

        authSuccess: (state, action) => {
            state.loading = false
            if(action.payload.user){
                state.user = action.payload.user
            }

            if(action.payload.authToken){
                localStorage.setItem('authToken', action.payload.authToken)
                state.authToken = action.payload.authToken
            }
        },

        authFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage? action.payload.errorMessage: null
        }

    }
})

export const authReducer = authSlice.reducer
export const {authFailed, authSuccess, authRequest} = authSlice.actions