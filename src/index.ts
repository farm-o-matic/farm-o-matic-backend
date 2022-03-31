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
app.get('/viewPresets', async (req, res) => {
    const presets = await prisma.planterboxsettings.findMany({
        where: { 
            SettingsID: {
                startsWith: '701' //SettingsID of presets start are from 701,000,000 to 701,999,999
            }
        }
    })
    res.json(presets)
})

// create new plant profile (settings preset)
app.post('/createPreset', async (req, res) => {
    const { SettingsID, SettingName, wateringMode, minMoisture, maxMoisture, 
            minLightIntensity, maxLightIntensity, lightingMode, lightStartTime, 
            lightStopTime, lightPower, lightStatus} = req.body

    const result = await prisma.planterboxsettings.create({
        data: {
            SettingsID: SettingsID,
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
app.put('/updateBoxSettings/', async (req, res) => {
    const { SettingsID, SettingName, wateringMode, minMoisture, maxMoisture, 
            minLightIntensity, maxLightIntensity, lightingMode, lightStartTime, 
            lightStopTime, lightPower, lightStatus} = req.body

    try {
        const settings = await prisma.planterboxsettings.update({
        where: { SettingsID: SettingsID },
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
    res.json({ error: `Settings with ID ${SettingsID} does not exist in the database` })
  }
})

app.listen(port, () => {
console.log(`The application is listening on port ${port}!`)
})