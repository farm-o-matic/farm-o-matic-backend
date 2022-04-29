import { Response, Request, Application } from 'express'
import userRouter from './Routes/user.routes'
import planterboxRouter from './Routes/planterbox.routes'
import pbsettingRouter from './Routes/pbsetting.routes'
import wikiRouter from './Routes/wiki.routes'
import { setting, fetchBoxSetting, conArgs, fetchBoxSchedule, durationArgs, 
schedule, storeLight, storeMoist, storeTemp } from './Controllers/scheduler.controller'
import * as express from 'express'
import * as cron from 'node-cron'
//mqtt
// import { mqttBrokerInterface } from './Models/mqttBroker.model'
// import * as mqtt from "mqtt"
import { mqttClient } from './helper/mqtt.client'

const app: Application = express()
const port: Number = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Well done!')
})

app.use('/user', userRouter)

app.use('/planterbox', planterboxRouter)

app.use('/pbsetting', pbsettingRouter)

app.use('/wiki', wikiRouter)

app.listen(port, () => {
    console.log(`The application is listening on port ${port}! \nor click: http://localhost:${port}/`)
})

//////////////////////////////
////CONTROLLER STARTS HERE////
//////////////////////////////

cron.schedule('*/20 * * * * *', () => { //this scheduler will fecth the settings every 20s
    fetchBoxSetting('1')//I'm getting the settings and schedules for boxID 1
    fetchBoxSchedule('1')

    if (setting.wateringMode == 'Schedule') {
        waterStartTask.start()
        waterStopTask.start()
    } else if (setting.wateringMode == 'Manual') {
        waterStartTask.stop()
        waterStopTask.stop()
    } else if (setting.wateringMode == 'Auto') {
        waterStartTask.stop()
        waterStopTask.stop()
    }

    if (setting.lightingMode == 'Schedule') {
        lightStartTask.start()
        lightStopTask.start()
    } else if (setting.lightingMode == 'Manual') {
        lightStartTask.stop()
        lightStopTask.stop()
    } else if (setting.lightingMode == 'Auto') {
        lightStartTask.stop()
        lightStopTask.stop()
    }
})

////////////////////////////
//SCHEDULERS START HERE/////
////////////////////////////

let lightStartTask = cron.schedule(conArgs(setting.lightStartTime), () => {
    console.log('turning lights on')
    timezone: "Asia/Bangkok"
    //put code to TURN ON LIGHTS here
    mqttClient.publish('lighting', '0')
})

let lightStopTask = cron.schedule(conArgs(setting.lightStopTime), () => {
    console.log('turning lights off')
    timezone: "Asia/Bangkok"
    //put code to TURN OFF LIGHTS here
    mqttClient.publish('lighting', '1')
})

let waterStartTask = cron.schedule(conArgs(schedule.wateringschedule[0].time), () => {
    timezone: "Asia/Bangkok"
    console.log('turninf watering on')
    //put code to TURN ON WATER here
    mqttClient.publish('sensor/watering', '0')
})

let waterStopTask = cron.schedule(durationArgs(schedule.wateringschedule[0].time, schedule.wateringschedule[0].duration), () => {
    timezone: "Asia/Bangkok"
    console.log('turninf watering off')
    //put code to TURN OFF WATER here
    mqttClient.publish('sensor/watering', '1')
})

////////////////////////
////Connect to mqtt////
////////////////////////
// const mqttBroker: mqttBrokerInterface = {
//     "host": 'mqtts://66d6b91771ff4fc7bb664c04cc3e7fbb.s2.eu.hivemq.cloud',
//     // "host": 'broker.mqttdashboard.com',
//     "port": 8883,
//     "username": 'ICERUS',
//     "password": 'Projectyear3',
// }

// let client = mqtt.connect(mqttBroker.host,
//     {
//         port: mqttBroker.port, username: mqttBroker.username, password: mqttBroker.password
//     }
// )

mqttClient.on('connect', () => {
    console.log('Mqtt broker is connected')
    mqttClient.subscribe({ 'sensor/#': { qos: 2 } }, (err: any) => {
        if (!err) {
            mqttClient.publish('test/1', 'Hello mqtt')
        } else {
            console.log(err)
        }
    })
})

mqttClient.on('disconnect', () => {
    console.log('mqtt broker is disconnected')

})
enum sensor {
    rh = 'rh',
    temp = 'temp',
    watering = 'watering',
    light = 'light'

}

mqttClient.on('message', (topic, message) => {
    const topicSpec = topic.split('/')
    const mess = message.toString()
    if (topicSpec[0] === 'sensor') {
        switch (topicSpec[1]) {
            case sensor.rh: {
                console.log('rh', mess)
                storeMoist(1, mess)
                if(setting.wateringMode == 'Auto'){
                    if (parseFloat(mess) < setting.minMoisture) {
                        mqttClient.publish('sensor/watering', '0')
                    } else if (parseFloat(mess) >= setting.maxMoisture) {
                        mqttClient.publish('sensor/watering', '1')
                    }
                }
            }
            case sensor.watering: {
                console.log(sensor.watering, mess)
            }
            case sensor.temp: {
                console.log(sensor.temp, mess)
                storeTemp(1, mess)
            }
            case sensor.light:{
                console.log(sensor.light,mess)
            }
            default: {
                console.log(topicSpec[1], mess)
            }
        }
    } else {
        console.log(topicSpec)
    }
    //TUM ADD TO DATABASE WITH THIS NA. 
})
