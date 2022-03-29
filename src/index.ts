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
app.get('/viewpresets', async (req, res) => {
    const presets = await prisma.planterboxsettings.findMany({
        where: { 
            SettingsID: {
                startsWith: '701' //SettingsID of presets start are from 701,000,000 to 701,999,999
            }
        }
    })
    res.json(presets)
})

app.listen(port, () => {
console.log(`The application is listening on port ${port}!`)
})