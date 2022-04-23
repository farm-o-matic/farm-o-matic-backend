export interface scheduleModel {
    fertilizerschedule: [
        {
            FSID: number,
            SettingsID: number,
            time: string,
            Interval: number
        }
    ],
    wateringschedule: [
        {
            WSID: number,
            SettingsID: number,
            time: string,
            duration: number
        }
    ],
    pesticideschedule: [
        {
            PSID: number,
            SettingsID: number,
            time: string,
            Interval: number
        }
    ]
}