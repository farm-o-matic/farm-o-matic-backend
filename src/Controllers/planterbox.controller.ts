import { Request, Response } from 'express'
// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()
import { prisma } from '../helper/prisma.client'

export const getboxsettings = async (req: Request, res: Response) => {
    const { id } = req.params
    const settings = await prisma.planterbox.findUnique({
        where: {
            boxID: Number(id),
        },
        include: {
            planterboxsettings: true,
        },
    })
    if (settings){
        return res.json(settings['planterboxsettings'])
    }else{
        return res.json({
            error: true,
            description: "getBoxSetting Error"
        })
    }
}

export const viewPresets = async (req: Request, res: Response) => {
    const presets = await prisma.planterboxsettings.findMany({
        where: {
            SettingsID: {
                lt: 100000 //SettingsID of presets start are 100,000 and below
            }
        }
    })
    res.json(presets)
}

export const createPreset = async (req: Request, res: Response) => {
    const { SettingName, plantPicture, wateringMode, minMoisture, maxMoisture,
        minLightIntensity, maxLightIntensity, lightingMode, lightStartTime,
        lightStopTime, lightPower, lightStatus } = req.body

    const result = await prisma.planterboxsettings.create({
        data: {
            SettingName: SettingName,
            plantPicture: plantPicture,
            wateringMode: wateringMode,
            minMoisture: minMoisture,
            maxMoisture: maxMoisture,
            minLightIntensity: minLightIntensity,
            maxLightIntensity: maxLightIntensity,
            lightingMode: lightingMode,
            lightStartTime: lightStartTime,
            lightStopTime: lightStopTime,
            lightPower: lightPower,
            lightStatus: lightStatus
        }
    })
    res.json(result)
}

export const updateBoxSettings = async (req: Request, res: Response) => {
    const { id } = req.params
    const { SettingName, plantPicture, wateringMode, minMoisture, maxMoisture,
        minLightIntensity, maxLightIntensity, lightingMode, lightStartTime,
        lightStopTime, lightPower, lightStatus } = req.body

    try {
        const settings = await prisma.planterboxsettings.update({
            where: { SettingsID: Number(id) },
            data: {
                SettingName: SettingName,
                plantPicture: plantPicture,
                wateringMode: wateringMode,
                minMoisture: minMoisture,
                maxMoisture: maxMoisture,
                minLightIntensity: minLightIntensity,
                maxLightIntensity: maxLightIntensity,
                lightingMode: lightingMode,
                lightStartTime: lightStartTime,
                lightStopTime: lightStopTime,
                lightPower: lightPower,
                lightStatus: lightStatus
            },
        })

        res.json(settings)
    } catch (error) {
        res.json({ error: `Settings with ID ${id} does not exist in the database` })
    }
}

export const addWateringSchedule = async (req:Request, res:Response) => {
    const { id } = req.params
    const { time } = req.body
    const schedule = await prisma.wateringschedule.create({
        data: {
            time: time,
            SettingsID: Number(id)
        }
    })
    res.json(schedule)
}

export const updateWateringSchedule = async (req:Request, res:Response) => {
    const { id } = req.params
    const { oldTime, newTime } = req.body

    try{
        const schedule = await prisma.wateringschedule.update({
            where:{
                time_SettingsID: {
                    time: oldTime,
                    SettingsID: Number(id)
                }
            },
            data: {
                time: newTime
            }
        })
        res.json(schedule)
    } catch (error) {
        res.json({ error: `Settings with ID ${ id } does not exist in the database` })
    }
}

export const updateFertilizerSchedule =  async (req:Request, res:Response) => {
    const { id } = req.params
    const { oldTime, newTime, Interval } = req.body

    try{
        const schedule = await prisma.fertilizerschedule.update({
            where:{
                time_SettingsID: {
                    time: oldTime,
                    SettingsID: Number(id)
                }
            },
            data: {
                time: newTime,
                Interval: Interval
            }
        })
        res.json(schedule)
    } catch (error) {
        res.json({ error: `Settings with ID ${ id } does not exist in the database` })
    }
}

export const addPesticideSchedule = async (req:Request, res:Response) => {
    const { id } = req.params
    const { time, Interval } = req.body
    const schedule = await prisma.pesticideschedule.create({
        data: {
            time: time,
            SettingsID: Number(id),
            Interval: Interval
        }
    })
    res.json(schedule)
}

export const updatePesticideSchedule = async (req:Request, res:Response) => {
    const { id } = req.params
    const { oldTime, newTime, Interval } = req.body

    try{
        const schedule = await prisma.pesticideschedule.update({
            where:{
                time_SettingsID: {
                    time: oldTime,
                    SettingsID: Number(id)
                }
            },
            data: {
                time: newTime,
                Interval: Interval
            }
        })
        res.json(schedule)
    } catch (error) {
        res.json({ error: `Settings with ID ${ id } does not exist in the database` })
    }
}

export const addFertilizerSchedule = async (req:Request, res:Response) => {
    const { id } = req.params
    const { time, Interval } = req.body
    const schedule = await prisma.fertilizerschedule.create({
        data: {
            time: time,
            SettingsID: Number(id),
            Interval: Interval
        }
    })
    res.json(schedule)
}