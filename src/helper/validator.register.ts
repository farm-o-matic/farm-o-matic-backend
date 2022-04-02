import { prisma } from './prisma.client'
import { userModel } from '../Models/user.model'
import { validator } from '../Models/registerValidator'

const emailValidator = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

const existedEmail = (email: string) => {
    return prisma.user.findFirst({
        where: {
            Email: email,
        }
    })
}

const existedUsername = (username: string) => {
    return prisma.user.findFirst({
        where: {
            UserName: username,
        }
    })
};

export const registerValidation = async (user: userModel) => {
    let result: validator = {
        emailValid: false,
        existedEmail: false,
        existedUsername: false
    }
    if (await !emailValidator(user.email)) result.emailValid = true
    if (await existedEmail(user.email)) result.existedEmail = true
    if (await existedUsername(user.username)) result.existedUsername = true
    return result
}