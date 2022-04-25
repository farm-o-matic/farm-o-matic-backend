import { settingModel } from "../Models/setting.model"
import { requestMethod } from '../Models/requestMethod.model'
import axios from 'axios'
import { scheduleModel } from "../Models/schedule.model"

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
export let schedule: scheduleModel = {
    fertilizerschedule: [
        {
            FSID: 0,
            SettingsID: 0,
            time: '1970-01-01t00:00:00.000z',
            Interval: 10
        }
    ],
    wateringschedule: [
        {
            WSID: 0,
            SettingsID: 0,
            time: '1970-01-01t00:00:00.000z',
            duration: 0
        }
    ],
    pesticideschedule: [
        {
            PSID: 0,
            SettingsID: 0,
            time: '1970-01-01t00:00:00.000z',
            Interval: 10
        }
    ]
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
            method: requestMethod.get,
            headers: { 'content-type': 'application/json' },
            url: 'http://localhost:3000/pbsetting/'+id+'/schedules',
        }
        schedule = (await axios.request(config)).data
    } catch (error) {
        console.error(error)
    }
}

export function conArgs(time: string){ //this function converts UTC datetime to a time argument for the cron scheduler
    const dateTime = new Date(time)
    return dateTime.getUTCMinutes() + ' ' + dateTime.getUTCHours() + ' * * *'
}

export function durationArgs(time: string, duration: number){ //this function is for stopping watering. It will return: time + duration
    const dateTime = new Date(time)
    return duration + dateTime.getUTCMinutes() + ' ' + dateTime.getUTCHours() + ' * * *'
}