import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { themeReducer } from "./themeSlice";
import { projectReducer } from "./projectSlice";
import { taskReducer } from "./taskSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        project: projectReducer,
        task: taskReducer
    }
})