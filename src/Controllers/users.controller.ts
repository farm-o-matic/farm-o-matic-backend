import { Request, Response } from 'express'
import { prisma } from '../helper/prisma.client'
import { returnModel } from '../Models/return.model';
import { userModel,userModelToUpdate } from '../Models/user.model'
import * as bcrypt from "bcrypt"
import { registerValidation } from '../helper/validator.user'
import { loginModel } from '../Models/login.model'
import { userIDModel } from '../Models/userID.model'

const salt = process.env.SALT || 10;

export const register = async (req: Request, res: Response) => {
	let result: returnModel = {
		error: true,
	}
	const user: userModel = {
		email: req.body.email,
		username: req.body.username,
		password: await bcrypt.hash(req.body.password, salt)
	}
	const userValidation = await registerValidation(user)
	if (Object.values(userValidation).every(val => val === false)) {
		const newUser = await prisma.user.create({
			data: {
				Email: user.email,
				UserName: user.username!,
				Password: user.password,
				Picture: null,
				TotalUpvotes: 0
			},
		});
		result.error = false
		result.description = newUser
		console.log(`User ${newUser} registered!`)
	} else {
		result.error = true
		result.description = userValidation
		console.error("Failed to register.")
	}
	res.json(result)
}

export const login = async (req: Request, res: Response) => {
	const user: userModel = {
		email: req.body.email,
		password: req.body.password
	}
	let loginValidator: loginModel = {
		existedUser: false,
		correctPassword: false
	}
	let UID : userIDModel = {
		UserID : 0,
		UserName : 'none'
	}

	let result: returnModel = { //แก้ตัวนี้
		error: true,
		description: {
			
				loginValidator,
				UID
		}
	}

	if (user.email && user.password) {
		const userValidation = await prisma.user.findFirst({
			where: {
				Email: user.email,
			}
		});
		if (userValidation !== null && await bcrypt.compare(user.password, userValidation.Password)) {
			result.error = false
			loginValidator.correctPassword = true
			UID.UserID = userValidation.UserID
			UID.UserName = userValidation.UserName
		} else {
			loginValidator.existedUser = true
		}
	} else {
		result.error = true
	}
	res.json(result);
}

export const getuser = async (req: Request, res: Response) => {
	const { id } = req.params;
	//const x: number = +id;
	const user = await prisma.user.findFirst({
		where: {
			UserID: Number(id),
		}
	})
	res.json(user);
}

//changed from boxID to serialNumber because boxID auto increments by the DB, and serial# ties to the physical box
export const addbox = async (req: Request, res: Response) => {
	const { id } = req.params;
	const serialNumber = await req.body.serialNumber;
	//const y: number = +id;
	const pbox = await prisma.planterbox.findFirst({
		where: {
			serialNumber: serialNumber,
		}
	});
	if (pbox !== null) {
		res.json({
			serialNumber: null,
			ownerID: null,
			SettingsID: null
		});
	} else {
		const registerbox = await prisma.planterbox.create({
			data: {
				serialNumber: serialNumber,
				ownerID: Number(id),
				SettingsID: 0
			},
		});
		res.json(registerbox);
	}
}
//@TO-DO: validate the username and email are not similar with other users. 
export const patchid = async (req: Request, res: Response) => {
	const { id } = req.params
	const user: userModelToUpdate = {
		Email: req.body.email,
		UserName: req.body.username,
		Password: await bcrypt.hash(req.body.password, salt)
	}
	console.log(user)
	try {
		const userUpdated = await prisma.user.update({
			where: {
				UserID: Number(id),
			},
			data: user
		})
		res.json(userUpdated)
	} catch (error) {
		res.json({
			error: true,
			discription: 'The userID is not avaliable.', 
			id: id
		})
		console.log(error)
	}
}

//get all user planterboxes data
export const getuserboxes = async (req: Request, res: Response) => {
	const { id } = req.params
	const planterboxes = await prisma.planterbox.findMany({
		where: {
			ownerID: Number(id),
		},
		include: {
			planterboxsettings: true
		}
	})
	res.json(planterboxes)
}

