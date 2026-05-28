import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    theme: "white" | "dark",
}

const initialState: InitialState = {
    theme: localStorage.getItem("theme") === "dark"? "dark": "white"
}

const themeSlice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        switchTheme: (state) => {
            if(state.theme === "white"){
                state.theme = "dark"
            }else{
                state.theme = "white"
            }
            localStorage.setItem("theme", state.theme)
        }
    }
})

export const {switchTheme} = themeSlice.actions
export const themeReducer = themeSlice.reducer