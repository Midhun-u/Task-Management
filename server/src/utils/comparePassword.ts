import bcrypt from 'bcrypt'

// Function for comparing password
export const comparePassword = async (planPassword: string, hashedPassword: string) => {

    const isPasswordCorrect = await bcrypt.compare(planPassword, hashedPassword)
    return isPasswordCorrect

}