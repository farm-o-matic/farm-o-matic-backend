import { equiment, status } from "./mqttHelper.status"

export interface lightingSensor{ 
    boxId: string,
    equiment: equiment
    status: status
}