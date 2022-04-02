import { Request, Response } from 'express'
import { prisma } from '../helper/prisma.client'
import { returnData } from '../Models/returnJSON';
import { userModel } from '../Models/user.model'
import * as bcrypt from "bcrypt"
import { registerValidation } from '../helper/validator.register'
const salt = 10;
export const register = async (req: Request, res: Response) => {
	const result: returnData = {
		error: true,
	}
	const user: userModel = {
		email: req.body.email,
		username: req.body.username,
		password: await bcrypt.hash(req.body.password, salt)
	}
	// const email = req.body.email;
	// const username = req.body.username;
	// const password = req.body.password;
	// const password2 = req.body.password2;
	// const validateEmail = (email: string) => {
	// 	return email.match(
	// 		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	// 	);
	// };
	// const valemail = await prisma.user.findFirst({
	// 	where: {
	// 		Email: user.email,
	// 	}
	// });
	// const valusername = await prisma.user.findFirst({
	// 	where: {
	// 		UserName: user.username,
	// 	}
	// });
	// const valpassword = await prisma.user.findFirst({
	// 	where: {
	// 		Password: user.password,
	// 	}
	// });

	// if (!user.username) {
	// 	result.discription = 'Username is required'
	// } else if (!user.email) {
	// 	result.discription = 'Email is required!'
	// } else if (!user.password) {
	// 	result.discription = 'Password is required!'
	// } else if (!user.password2) {
	// 	result.discription = 'Confirmed Password is required!'
	// } else if (!validateEmail(user.email)) {
	// 	result.discription = 'Invalid Email!'
	// } else if (user.password.length < 8) {
	// 	result.discription = 'Password should be 8 characters minimum!'
	// } else if (user.password2 !== user.password) {
	// 	result.discription = 'Passwords are not matched!'
	// } else if (valemail !== null) {
	// 	result.discription = 'This email is already used!'
	// } else if (valusername !== null) {
	// 	result.discription = 'This username is already used!'
	// } else if (valpassword !== null) {
	// 	result.discription = 'This password is already used!'
	// } else {
	// }
	const userValidation = await registerValidation(user)
	if (!Object.values(userValidation).every(Boolean)) {
		const newUser = await prisma.user.create({
			data: {
				Email: user.email,
				UserName: user.username,
				Password: user.password,
				Picture: null,
				TotalUpvotes: 0
			},
		});
		result.error = false
		result.discription = newUser
		res.json(result)
	} else {
		result.error = true
		result.discription = userValidation
	}
}

export const login = async (req: Request, res: Response) => {
	const email = req.body.email;
	const password = req.body.password;
	if (email && password) {
		const userValidation = await prisma.user.findFirst({
			where: {
				Email: email,
			}
		});
		if (userValidation !== null && await bcrypt.compare(password, userValidation.Password)) {
			res.send('Logged in!');
		} else {
			res.send('Incorrect Username or Password!');
		}
	} else {
		res.send('Please enter Username and Password!');
	}
}

export const getuser = async (req: Request, res: Response) => {
	const { id } = req.params;
	var x: number = +id;
	const user = await prisma.user.findFirst({
		where: {
			UserID: x,
		}
	})
	res.json(user);
}

export const addbox = async (req: Request, res: Response) => {
	const { id } = req.params;
	const boxid = req.body.boxid;
	var y: number = +id;
	const pbox = await prisma.planterbox.findFirst({
		where: {
			boxID: boxid,
		}
	});
	if (pbox !== null) {
		res.send('This box is already registered!');
	} else {
		const registerbox = await prisma.planterbox.create({
			data: {
				boxID: boxid,
				ownerID: y,
				SettingsID: null
			},
		});
		res.json(registerbox);
	}
}
export const patchid = async (req: Request, res: Response) => {
	const { id } = req.params
	const user = await prisma.user.update({
		where: {
			UserID: Number(id),
		},
		data: req.body
	})
	res.json(user)
}

//get all user planterboxes data
export const getuserboxes = async (req: Request, res: Response) => {
	const { id } = req.params
	const planterboxes = await prisma.planterbox.findMany({
		where: {
			ownerID: Number(id),
		}
	})
	res.json(planterboxes)
}

