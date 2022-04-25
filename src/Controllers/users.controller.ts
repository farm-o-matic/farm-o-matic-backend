import { Request, Response } from 'express'
import { prisma } from '../helper/prisma.client'
import { returnModel } from '../Models/return.model';
import { userModel } from '../Models/user.model'
import * as bcrypt from "bcrypt"
import { registerValidation } from '../helper/validator.user'
import { loginModel } from '../Models/login.model'

const salt = 10;

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
	} else {
		result.error = true
		result.description = userValidation
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
	let result: returnModel = {
		error: true,
		description: loginValidator
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
export const patchid = async (req: Request, res: Response) => {
	const { id } = req.params

	try{
	const user = await prisma.user.update({
		where: {
			UserID: Number(id),
		},
		data: req.body
	})
	res.json(user)
	}catch(error){
		res.json({
			error: true,
        	discription: 'The userID is not avaliable.',id
		})
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

