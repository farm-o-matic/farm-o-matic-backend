import {Response, Request, Application} from 'express'
import * as express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app:Application = express()
const port:Number = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req:Request, res:Response) => {
    res.send('Well done!')
})

// view list of plant profile (settings preset)
app.get('planterboxes/viewPresets', async (req, res) => {
    const presets = await prisma.planterboxsettings.findMany({
        where: { 
            SettingsID: {
                lt: 100000 //SettingsID of presets start are 100,000 and below
            }
        }
    })
    res.json(presets)
})

// create new plant profile (settings preset)
app.post('planterboxes/createPreset', async (req, res) => {
    const { SettingName, wateringMode, minMoisture, maxMoisture, 
            minLightIntensity, maxLightIntensity, lightingMode, lightStartTime, 
            lightStopTime, lightPower, lightStatus} = req.body

    const result = await prisma.planterboxsettings.create({
        data: {
            SettingName: SettingName,
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
})

// update box settings
app.put('planterboxes/settings/:id/updateBoxSettings/', async (req, res) => {
    const { id } = req.params
    const { SettingName, wateringMode, minMoisture, maxMoisture, 
            minLightIntensity, maxLightIntensity, lightingMode, lightStartTime, 
            lightStopTime, lightPower, lightStatus} = req.body

    try {
        const settings = await prisma.planterboxsettings.update({
        where: { SettingsID: Number(id) },
            data: {
                SettingName: SettingName,
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
    res.json({ error: `Settings with ID ${ id } does not exist in the database` })
  }
})

// create new watering schedule
app.post('/planterboxes/settings/:id/addWateringSchedule', async (req, res) => {
    const { id } = req.params
    const { time } = req.body
    const schedule = await prisma.wateringschedule.create({
        data: {
            time: time,
            SettingsID: Number(id)
        }
    })
    res.json(schedule)
})

// update watering schedule
app.put('/planterboxes/settings/:id/updateWateringSchedule', async (req, res) => {
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

    }
})

// create new pesticide schedule
app.post('/planterboxes/settings/:id/addPesticideSchedule', async (req, res) => {
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
})

// update pesticide schedule
app.put('/planterboxes/settings/:id/updatePesticideSchedule', async (req, res) => {
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
        console.err(error)
    }
})

// create new fertilizer schedule
app.post('/planterboxes/settings/:id/addFertilizerSchedule', async (req, res) => {
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
})

// update fertilizer schedule
app.put('/planterboxes/settings/:id/updateFertilizerSchedule', async (req, res) => {
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

    }
})

app.listen(port, () => {
console.log(`The application is listening on port ${port}!`)
})