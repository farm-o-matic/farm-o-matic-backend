import {Response, Request, Application} from 'express'
import * as express from 'express'
import userRouter from './Routes/user.routes'
import planterboxRouter from './Routes/planterbox.routes'
import pbsettingRouter from './Routes/pbsetting.routes'
import { settingModel } from './Models/setting.model'
import * as cron from 'node-cron'
import axios from 'axios'
import { requestMethod } from './Models/requestMethod.model'

const app:Application = express()
const port:Number = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req:Request, res:Response) => {
    res.send('Well done!')
})

app.use('/user',userRouter)

app.use('/planterbox',planterboxRouter)

app.use('/pbsetting', pbsettingRouter)

app.listen(port, () => {
    console.log(`The application is listening on port ${port}! \nor click: http://localhost:${port}/`)
})

////////////////////////////
//CONTROLLER STARTS HERE////
////////////////////////////

//will move API to separate file later

let setting: settingModel

export const fetchBoxSetting = async (id: string) => {
    try {
        const config = {
            method: requestMethod.post,
            headers: { 'content-type': 'application/json' },
            url: 'http://localhost:3000/planterbox/settings',
            data: JSON.stringify({
                id: id,
            }),
        }
        setting = (await axios.request(config)).data
    } catch (error) {
        console.error(error)
    }
}

cron.schedule('*/3 * * * * *', () => { //this scheduler will fecth the settings every minute, but here I set it to 3 sec for testing
    fetchBoxSetting('2')
    console.log(setting)

    if(true){
        lightingTask.start()
    }
})

////////////////////////////
//SCHEDULERS START HERE/////
////////////////////////////

function toCronArgs(input: string){ //this function converts UTC datetime to a time argument for the cron scheduler
    const dateTime = new Date(input)
    return dateTime.getUTCMinutes() + ' ' + dateTime.getUTCHours() + ' * * *'
}

let lightingTask = cron.schedule(toCronArgs('1970-01-01T09:00:00.000Z'), () => {//will have to replace the string with lightStartTime from the settings JSON
    console.log('running')
    timezone:"Asia/Bangkok"
    //put code to trigger watering here; wait for Smart to make code
})