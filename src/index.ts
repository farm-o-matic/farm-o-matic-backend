import { Response, Request, Application } from 'express'
import userRouter from './Routes/user.routes'
import planterboxRouter from './Routes/planterbox.routes'
import pbsettingRouter from './Routes/pbsetting.routes'
import wikiRouter from './Routes/wiki.routes'
import { setting, fetchBoxSetting, conArgs, fetchBoxSchedule, durationArgs, 
schedule, storeLight, storeMoist, storeTemp, LEDpower } from './Controllers/scheduler.controller'
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
    // timezone: "Asia/Bangkok"
    //put code to TURN ON LIGHTS here
    mqttClient.publish('sensor/led', LEDpower(setting.lightPower))
})

let lightStopTask = cron.schedule(conArgs(setting.lightStopTime), () => {
    console.log('turning lights off')
    // timezone: "Asia/Bangkok"
    //put code to TURN OFF LIGHTS here
    mqttClient.publish('sensor/led', 'off')
})

let waterStartTask = cron.schedule(conArgs(schedule.wateringschedule.time), () => {
    // timezone: "Asia/Bangkok"
    console.log('turning watering on')
    //put code to TURN ON WATER here
    mqttClient.publish('sensor/watering', 'on')
})

let waterStopTask = cron.schedule(durationArgs(schedule.wateringschedule.time, schedule.wateringschedule.duration), () => {
    // timezone: "Asia/Bangkok"
    console.log('turning watering off')
    //put code to TURN OFF WATER here
    mqttClient.publish('sensor/watering', 'off')
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
    light = 'light'

}

mqttClient.on('message', (topic, message) => {
    const topicSpec = topic.split('/')
    const mess = message.toString()
    // console.log(topicSpec)
    if (topicSpec[0] === 'sensor') {
        switch (topicSpec[1]) {
            case sensor.rh: {
                console.log(sensor.rh, mess)
                storeMoist(mess)
                if(setting.wateringMode == 'Auto'){
                    if (parseFloat(mess.split(',')[1]) < setting.minMoisture) {
                        mqttClient.publish('sensor/watering', mess.split(',')[0]+',on')
                        setTimeout(() => mqttClient.publish('sensor/watering', mess.split(',')[0]+',off'),3000)
                    }
                }
                break
            }
            case sensor.temp: {
                console.log(sensor.temp, mess)
                storeTemp(mess)
                break
            }
            case sensor.light:{
                console.log(sensor.light, mess)

                storeLight(mess)
                const timeNow = new Date().getTime()
                const startTime = new Date(setting.lightStartTime).getTime()
                const stopTime = new Date(setting.lightStopTime).getTime()

                if(setting.lightingMode == 'Auto' && timeNow < stopTime && startTime < timeNow ){
                    if (parseFloat(mess.split(',')[1]) < setting.minLightIntensity) {
                        mqttClient.publish('sensor/led', mess.split(',')[0]+','+LEDpower(setting.lightPower))
                    } else if (parseFloat(mess.split(',')[1]) >= setting.maxLightIntensity) {
                        mqttClient.publish('sensor/led', mess.split(',')[0]+','+'off')
                    }
                }
            }
            break
        }
    } else {
        console.log('not logged' + topicSpec)
    }
    //TUM ADD TO DATABASE WITH THIS NA. 
})
