import * as mqtt from "mqtt"
import { mqttConfig } from "../config/mqtt.config";

export let mqttClient = mqtt.connect(mqttConfig.host,
    {
        port: mqttConfig.port, username: mqttConfig.username, password: mqttConfig.password
    }
)