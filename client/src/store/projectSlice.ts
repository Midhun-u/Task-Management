import { createSlice } from "@reduxjs/toolkit";
import type { Project } from "../types/project";

type InitialState = {
    loading: boolean
    project: Project | null
    projects: Array<Project>
    errorMessage: string
}

const initialState: InitialState = {
    loading: false,
    project: null,
    projects: [],
    errorMessage: ""
}

const projectSlice = createSlice({
    name: "project",
    initialState: initialState,
    reducers: {

        projectRequest: (state) => {
            state.loading = true
            state.project = null
        },

        projectSuccess: (state, action) => {
            state.loading = false
            state.project = action.payload?.project? action.payload.project: null
            if(state.projects.length <= 0 || action.payload?.page <= 1){
                state.projects = action.payload?.projects?.length? action.payload.projects: []
            }else if(action.payload?.projects?.length){
                state.projects = [...state.projects, ...action.payload.projects]
            }
        },

        projectFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage
        }

    }
})

export const projectReducer = projectSlice.reducer
export const {projectFailed, projectRequest, projectSuccess} = projectSlice.actions