var cron = require('node-cron')
// import { Request, Response } from 'express'
// import { prisma } from '../helper/prisma.client'


export const schedule = cron.schedule('* * * * * *', () => {
    console.log('running every 1 sec')
    timezone:"Asia/Bangkok"
})