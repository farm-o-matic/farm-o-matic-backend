import { equiment, status } from "../Models/mqttHelper.status"
import { lightingSensor } from "../Models/mqttLighting.sensor"
import { wateringSensor } from "../Models/mqttWatering.sensor"
import { mqttClient } from "./mqtt.client"


export const wateringOn = (boxId: string)=>{
    const WATERING_ON:wateringSensor = {
        boxId: boxId,
        equiment: equiment.water,
        status: status.on
    }
    mqttClient.publish('sensor/watering',JSON.stringify(WATERING_ON),()=>{console.log('Watering ON!')})
}
export const wateringOff = (boxId: string)=>{
    const WATERING_OFF:wateringSensor = {
        boxId: boxId,
        equiment: equiment.water,
        status: status.off
    }
    mqttClient.publish('sensor/watering',JSON.stringify(WATERING_OFF),()=>{console.log('Watering ON!')})
}
export const lightOn = (boxId: string) => {
    const LIGHT_ON: lightingSensor ={
        boxId: boxId,
        equiment: equiment.light,
        status: status.on
    }
    mqttClient.publish('sensor/lighting',JSON.stringify(LIGHT_ON),()=>{console.log('Watering ON!')})
}
export const lightOff = (boxId: string) => {
    const LIGHT_OFF: lightingSensor ={
        boxId: boxId,
        equiment: equiment.light,
        status: status.off
    }
    mqttClient.publish('sensor/lighting',JSON.stringify(LIGHT_OFF),()=>{console.log('Watering ON!')})
}