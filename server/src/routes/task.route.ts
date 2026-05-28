import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { createTaskController } from '../controllers/task/createTask.controller.js'
import { getTaskController } from '../controllers/task/getTask.controller.js'
import { getProjectTaskController } from '../controllers/task/getProjectTasks.controller.js'
import { updateTaskController } from '../controllers/task/updateTask.controller.js'
import { deleteTaskController } from '../controllers/task/deleteTask.controller.js'

export const taskRouter = express()

// Route for creating task
taskRouter.post("/create-task", authMiddleware, createTaskController)

// Route for getting task
taskRouter.get("/get-task/:id", authMiddleware, getTaskController)

// Route for getting project tasks
taskRouter.get("/get-project-tasks/:projectId", authMiddleware, getProjectTaskController)

// Route for updating task
taskRouter.patch("/update-task/:id", authMiddleware, updateTaskController)

// Route for deleting task
taskRouter.delete("/delete-task/:id", authMiddleware, deleteTaskController)