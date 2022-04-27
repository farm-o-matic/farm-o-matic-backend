import { mqttClient } from "./mqtt.client"

export const wateringOn = ()=>{
    mqttClient.publish('sensor/watering',"on",()=>{console.log('Watering ON!')})
}
export const wateringOff = ()=>{
    mqttClient.publish('sensor/watering',"off",()=>{console.log('Watering ON!')})
}
export const lightOn = () => {
    mqttClient.publish('sensor/lighting',"on",()=>{console.log('Watering ON!')})
}
export const lightOff = () => {
    mqttClient.publish('sensor/lighting',"off",()=>{console.log('Watering ON!')})
}