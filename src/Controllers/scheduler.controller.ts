import { settingModel } from "../Models/setting.model"
import { requestMethod } from '../Models/requestMethod.model'
import axios from 'axios'

export let setting: settingModel = {
    SettingsID: 0,
    SettingName: 'Blank',
    plantPicture: '',
    wateringMode: 'Manual',
    waterStatus: 'OFF',
    minMoisture: 0,
    maxMoisture: 1,
    minLightIntensity: 0,
    maxLightIntensity: 100000,
    lightingMode: 'Manual',
    lightStartTime: '1970-01-01t00:00:00.000z',
    lightStopTime: '1970-01-01t23:59:00.000z',
    lightPower: 0,
    lightStatus: 'OFF'
}

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

export const fetchBoxSchedule = async (id: string) => {
    try {
        const config = {
            method: requestMethod.post,
            headers: { 'content-type': 'application/json' },
            url: 'http://localhost:3000/pbsetting/'+id+'/schedules',
        }
        setting = (await axios.request(config)).data
    } catch (error) {
        console.error(error)
    }
}

export function toCronArgs(input: string){ //this function converts UTC datetime to a time argument for the cron scheduler
    const dateTime = new Date(input)
    return dateTime.getUTCMinutes() + ' ' + dateTime.getUTCHours() + ' * * *'
}