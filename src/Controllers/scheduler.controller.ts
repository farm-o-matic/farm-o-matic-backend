import { settingModel } from "../Models/setting.model"
import { requestMethod } from '../Models/requestMethod.model'
import axios from 'axios'

export let setting: settingModel

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

export function toCronArgs(input: string){ //this function converts UTC datetime to a time argument for the cron scheduler
    const dateTime = new Date(input)
    return dateTime.getUTCMinutes() + ' ' + dateTime.getUTCHours() + ' * * *'
}