import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "../types/task";

type InitialState = {
    loading: boolean
    task: Task | null
    tasks: Array<Task>
    errorMessage: string
}

const initialState: InitialState = {
    loading: false,
    task: null,
    tasks: [],
    errorMessage: ""
}

const taskSlice = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {

        taskRequest: (state) => {
            state.loading = true
            state.task = null
        },

        taskSuccess: (state, action) => {
            state.loading = false
            state.task = action.payload?.task ? action.payload.task : null
            if (state.tasks.length <= 0 || action.payload?.page <= 1) {
                state.tasks = action.payload?.tasks?.length ? action.payload.tasks : []
            } else if (action.payload?.tasks?.length) {
                state.tasks = [...state.tasks, ...action.payload.tasks]
            }
        },

        taskFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage
        }

    }
})

export const { taskFailed, taskRequest, taskSuccess } = taskSlice.actions
export const taskReducer = taskSlice.reducer