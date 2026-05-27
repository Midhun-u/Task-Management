import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { createProjectController } from '../controllers/project/createProject.controller.js'
import { getProjectController } from '../controllers/project/getProject.controller.js'
import { getUserProjects } from '../controllers/project/getUserProjects.controller.js'
import { updateProjectController } from '../controllers/project/updateProject.controller.js'
import { deleteProjectController } from '../controllers/project/deleteProject.controller.js'

export const projectRouter = express()

// Route for creating project
projectRouter.post("/create-project", authMiddleware, createProjectController)

// Route for getting specific project
projectRouter.get("/get-project/:id", authMiddleware, getProjectController) 

// Route for getting user projects
projectRouter.get("/get-user-projects", authMiddleware, getUserProjects)

// Route for updating user project
projectRouter.patch("/update-project/:id", authMiddleware, updateProjectController)

// Route for deleting user project
projectRouter.delete("/delete-project/:id", authMiddleware, deleteProjectController)