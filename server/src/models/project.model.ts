import { Op } from "sequelize";
import { Project } from "../schemas/project.schema.js";
import type { ProjectType } from "../types/project.js";

export const ProjectModel = {

    addProject: async (data: Pick<ProjectType, "title" | "description" | "user_id">) => {

        const newProject = await Project.create({
            title: data.title,
            description: data.description,
            user_id: data.user_id
        })

        return newProject.dataValues

    },

    getProjectByIdAndUserId: async (id: string, userId: string) => {

        const project = await Project.findOne({
            where: {
                [Op.and]: [{ id: id }, { user_id: userId }]
            },
        })

        return project?.dataValues

    },

    getUserProjectsByUserId: async (userId: string, page: number, limit: number, searchQuery?: string) => {

        const searchQueryCondition = searchQuery ? {
            title: {
                [Op.iLike]: `%${searchQuery}%`
            }
        } : {}

        const projects = await Project.findAll({
            where: {
                user_id: {
                    [Op.eq]: userId
                },
                ...searchQueryCondition
            },
            offset: (page - 1) * limit,
            limit: limit
        })

        return projects

    },

    updateProjectByIdAndUserId: async (id: string, userId: string, data: Record<string, any>) => {

        const [updatedCount, updatedRows] = await Project.update(data, {
            where: {
                [Op.and]: [{ id: id }, { user_id: userId }]
            },
            returning: true
        })

        return { updatedCount, updatedRows }

    },

    deleteProjectBytIdAndUserId: async (id: string, userId: string) => {

        const deletedCount = await Project.destroy({
            where: {
                [Op.and]: [{ id: id }, { user_id: userId }]
            }
        })

        return deletedCount

    }

}