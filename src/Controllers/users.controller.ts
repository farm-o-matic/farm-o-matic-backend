import { Request, Response } from 'express'
import { prisma } from '../helper/prisma.client'
import { returnData } from '../Models/userValidator';
import * as bcrypt from "bcrypt"

const salt = 10;
export const register = async (req: Request, res: Response) => {
	const result: returnData = {
		error: true,
	}
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const password2 = req.body.password2;
	const validateEmail = (email: string) => {
		return email.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};
	const valemail = await prisma.user.findFirst({
		where: {
			Email: email,
		}
	});
	const valusername = await prisma.user.findFirst({
		where: {
			UserName: username,
		}
	});
	const valpassword = await prisma.user.findFirst({
		where: {
			Password: password,
		}
	});

	if (!username) {
		result.discription = 'Username is required'
	} else if (!email) {
		result.discription = 'Email is required!'
	} else if (!password) {
		result.discription = 'Password is required!'
	} else if (!password2) {
		result.discription = 'Confirmed Password is required!'
	} else if (!validateEmail(email)) {
		result.discription = 'Invalid Email!'
	} else if (password.length < 8) {
		result.discription = 'Password should be 8 characters minimum!'
	} else if (password2 !== password) {
		result.discription = 'Passwords are not matched!'
	} else if (valemail !== null) {
		result.discription = 'This email is already used!'
	} else if (valusername !== null) {
		result.discription = 'This username is already used!'
	} else if (valpassword !== null) {
		result.discription = 'This password is already used!'
	} else {
		const password = await bcrypt.hash(req.body.password, salt)
		const newUser = await prisma.user.create({
			data: {
				Email: req.body.email,
				UserName: req.body.username,
				Password: password,
				Picture: null,
				TotalUpvotes: 0
			},
		});
		result.error = false
		result.discription = newUser
	}
	res.json(result)
}

export const login = async (req: Request, res: Response) => {
	const email = req.body.email;
	const password = req.body.password;
	if (email && password) {
		const uservalidation = await prisma.user.findFirst({
			where: {
				Email: email,
			}
		});
		if (uservalidation !== null && await bcrypt.compare(password, uservalidation.Password)) {
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
export const getuserboxes = async(req: Request, res: Response) =>{
    const { id } = req.params
    const planterboxes = await prisma.planterbox.findMany({
        where: {
            ownerID: Number(id),
        }
    })
    res.json(planterboxes)
}

