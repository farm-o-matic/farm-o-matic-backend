import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { prisma } from "../helper/prisma.client"
import { Request, Response, NextFunction } from 'express'

const userRegister = (req: Request, res: Response, next: NextFunction) => {
    const { name, email }
}