"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getuserboxes = exports.patchid = exports.addbox = exports.getuser = exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bcrypt = require("bcrypt");
const salt = 10;
const register = async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    const validateEmail = (email) => {
        return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
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
        res.send('Username is required!');
    }
    else if (!email) {
        res.send('Email is required!');
    }
    else if (!password) {
        res.send('Password is required!');
    }
    else if (!password2) {
        res.send('Confirmed Password is required!');
    }
    else if (!validateEmail(email)) {
        res.send('Invalid Email!');
    }
    else if (password.length < 8) {
        res.send('Password should be 8 characters minimum!');
    }
    else if (password2 !== password) {
        res.send('Passwords are not matched!');
    }
    else if (valemail !== null) {
        res.send('This email is already used!');
    }
    else if (valusername !== null) {
        res.send('This username is already used!');
    }
    else if (valpassword !== null) {
        res.send('This password is already used!');
    }
    else {
        const password = await bcrypt.hash(req.body.password, salt);
        console.log(password);
        const newUser = await prisma.user.create({
            data: {
                Email: req.body.email,
                UserName: req.body.username,
                Password: password,
                Picture: null,
                TotalUpvotes: 0
            },
        });
        console.log('Registration Complete!');
        res.json(newUser);
    }
};
exports.register = register;
const login = async (req, res) => {
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
        }
        else {
            res.send('Incorrect Username or Password!');
        }
    }
    else {
        res.send('Please enter Username and Password!');
    }
};
exports.login = login;
const getuser = async (req, res) => {
    const { id } = req.params;
    var x = +id;
    const user = await prisma.user.findFirst({
        where: {
            UserID: x,
        }
    });
    res.json(user);
};
exports.getuser = getuser;
const addbox = async (req, res) => {
    const { id } = req.params;
    const boxid = req.body.boxid;
    var y = +id;
    const pbox = await prisma.planterbox.findFirst({
        where: {
            boxID: boxid,
        }
    });
    if (pbox !== null) {
        res.send('This box is already registered!');
    }
    else {
        const registerbox = await prisma.planterbox.create({
            data: {
                boxID: boxid,
                ownerID: y,
                SettingsID: null
            },
        });
        res.json(registerbox);
    }
};
exports.addbox = addbox;
const patchid = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.update({
        where: {
            UserID: Number(id),
        },
        data: req.body
    });
    res.json(user);
};
exports.patchid = patchid;
//get all user planterboxes data
const getuserboxes = async (req, res) => {
    const { id } = req.params;
    const planterboxes = await prisma.planterbox.findMany({
        where: {
            ownerID: Number(id),
        }
    });
    res.json(planterboxes);
};
exports.getuserboxes = getuserboxes;
//# sourceMappingURL=users.controller.js.map