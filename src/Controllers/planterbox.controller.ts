import { Request, Response } from 'express'
// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()
import { prisma } from '../helper/prisma.client'

export const getboxsettings = async (req: Request, res: Response) => {
    const { id } = req.body
    const settings = await prisma.planterbox.findUnique({
        where: {
            boxID: parseInt(id),
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
    const { SettingName, plantPicture, wateringMode, waterStatus, minMoisture, maxMoisture,
        minLightIntensity, maxLightIntensity, lightingMode, lightStartTime,
        lightStopTime, lightPower, lightStatus } = req.body

    const result = await prisma.planterboxsettings.create({
        data: {
            SettingName: SettingName,
            plantPicture: plantPicture,
            wateringMode: wateringMode,
            waterStatus: waterStatus,
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

export const deleteBox = async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        const deleteBox = await prisma.planterbox.delete({
            where: {
                boxID: parseInt(id), 
            },
        })
        res.json(deleteBox)
    }catch (error) {
        res.json({ error: `Planterbox with ID does not exist in the database`, id: id })
    }
}

export const updateBoxSettings = async (req: Request, res: Response) => {
    // const { id } = req.params
    const { id, SettingName, plantPicture, wateringMode, waterStatus, minMoisture, maxMoisture,
        minLightIntensity, maxLightIntensity, lightingMode, lightStartTime,
        lightStopTime, lightPower, lightStatus } = req.body

    try {
        const settings = await prisma.planterboxsettings.update({
            where: { SettingsID: parseInt(id) },
            data: {
                SettingName: SettingName,
                plantPicture: plantPicture,
                wateringMode: wateringMode,
                waterStatus: waterStatus,
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
        res.json({ error: `Settings with ID does not exist in the database`, id: id })
    }

}

export const addWateringSchedule = async (req:Request, res:Response) => {
    // const { id } = req.params
    const { id, time, duration } = req.body
    const schedule = await prisma.wateringschedule.create({
        data: {
            SettingsID: parseInt(id),
            time: time,
            duration: duration
        }
    })
    res.json(schedule)
}

export const updateWateringSchedule = async (req:Request, res:Response) => {
    // const { sid } = req.params
    const { sid, time, duration } = req.body

    try{
        const schedule = await prisma.wateringschedule.update({
            where:{ WSID: parseInt(sid) },
            data: {
                time: time,
                duration: duration
            }
        })
        res.json(schedule)
    } catch (error) {
        res.json({ error: `Schedule with ID does not exist in the database`, sid: sid })
    }
}

export const addFertilizerSchedule = async (req:Request, res:Response) => {
    // const { id } = req.params
    const { id, time, Interval } = req.body
    const schedule = await prisma.fertilizerschedule.create({
        data: {
            time: time,
            SettingsID: parseInt(id),
            Interval: Interval
        }
    })
    res.json(schedule)
}

export const updateFertilizerSchedule =  async (req:Request, res:Response) => {
    // const { sid } = req.params
    const { sid, time, Interval } = req.body

    try{
        const schedule = await prisma.fertilizerschedule.update({
            where:{ FSID: parseInt(sid)},
            data: {
                time: time,
                Interval: Interval
            }
        })
        res.json(schedule)
    } catch (error) {
        res.json({ error: `Schedule with ID does not exist in the database`, sid: sid })
    }
}

export const addPesticideSchedule = async (req:Request, res:Response) => {
    // const { id } = req.params
    const { id, time, Interval } = req.body
    const schedule = await prisma.pesticideschedule.create({
        data: {
            time: time,
            SettingsID: parseInt(id),
            Interval: Interval
        }
    })
    res.json(schedule)
}

export const updatePesticideSchedule = async (req:Request, res:Response) => {
    // const { sid } = req.params
    const { sid, time, Interval } = req.body

    try{
        const schedule = await prisma.pesticideschedule.update({
            where:{ PSID: parseInt(sid)},
            data: {
                time: time,
                Interval: Interval
            }
        })
        res.json(schedule)
    } catch (error) {
        res.json({ error: `Schedule with ID does not exist in the database`, sid: sid })
    }
}