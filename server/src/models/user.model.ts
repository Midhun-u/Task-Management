import { Op } from "sequelize"
import { User } from "../schemas/user.schema.js"
import type { AuthBody } from "../types/authBody.js"
import { excludePassword } from "../utils/excludePassword.js"

// User model
export const UserModel = {

    addUser: async (data: AuthBody) => {

        const newUser = await User.create({
            fullname: data.fullname.trim(),
            email: data.email.trim(),
            password: data.password.trim()
        }, {returning: true})

        return excludePassword(newUser.dataValues)

    },

    getUserByEmail: async (email: string) => {

        const user = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email
                }
            },
        })

        return user?.dataValues

    },

    getUserByEmailWithPassword: async (email: string) => {

        const user = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        })

        return user?.dataValues

    },

    getUserById: async (id: string) => {

        const user = await User.findByPk(id)
        return excludePassword(user?.dataValues)

    }

}