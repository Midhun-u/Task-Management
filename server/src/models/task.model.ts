import { Op } from "sequelize";
import { Task } from "../schemas/task.schema.js";
import type { TaskType } from "../types/task.js";

export const TaskModel = {

    addTask: async (data: Pick<TaskType, "title" | "project_id" | "user_id">) => {

        const newTask = await Task.create({
            title: data.title,
            project_id: data.project_id,
            user_id: data.user_id
        }, { returning: true })

        return newTask.dataValues

    },

    getTaskByIdAndUserId: async (id: string, userId: string) => {

        const task = await Task.findOne({
            where: {
                [Op.and]: [{ id: id }, { user_id: userId }]
            }
        })

        return task?.dataValues

    },

    getProjectTasksByProjectIdAndUserId: async (projectId: string, userId: string, page: number, limit: number, searchQuery?: string) => {

        const searchQueryCondition = searchQuery ? {
            title: {
                [Op.iLike]: `%${searchQuery}%`
            }
        } : {}

        const tasks = await Task.findAll({
            where: {
                [Op.and]: [{ project_id: projectId }, { user_id: userId }],
                ...searchQueryCondition
            },
            offset: (page - 1) * limit,
            limit: limit,
            raw: true,
            nest: true
        })

        return tasks

    },

    updateTaskByIdAndUserId: async (id: string, userId: string, data: Record<string, any>) => {

        const [updatedCount, updatedRows] = await Task.update(data, {
            where: {
                [Op.and]: [{id: id}, {user_id: userId}]
            },
            returning: true
        })

        return {updatedCount, updatedRows}

    },

    deleteTaskByIdAndUserId: async (id: string, userId: string) => {

        const deletedCount = await Task.destroy({
            where: {
                [Op.and]: [{id: id}, {user_id: userId}]
            }
        })

        return deletedCount

    },

    deleteTaskByProjectIdAndUserId: async (projectId: string, userId: string) => {

        const deletedCount = await Task.destroy({
            where: {
                [Op.and]: [{project_id: projectId}, {user_id: userId}]
            }
        })

        return deletedCount

    }

}