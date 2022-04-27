import { equiment, status } from "./mqttHelper.status";

export interface wateringSensor{ 
    boxId: string,
    equiment: equiment,
    status: status
}