import {Response, Request, Application} from 'express'
import * as express from 'express'
import userRouter from './Routes/user.routes'
import planterboxRouter from './Routes/planterbox.routes'
import pbsettingRouter from './Routes/pbsetting.routes'
import schedulerRouter from './Routes/scheduler.routes'
import * as cron from 'node-cron'
import axios from 'axios'
import { requestMethod } from './Models/requestMethod.model'

const app:Application = express()
const port:Number = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req:Request, res:Response) => {
    res.send('Well done!')
})

app.use('/user',userRouter)

app.use('/planterbox',planterboxRouter)

app.use('/pbsetting', pbsettingRouter)

app.use('/scheduler', schedulerRouter)

app.listen(port, () => {
    console.log(`The application is listening on port ${port}! \nor click: http://localhost:${port}/`)
})

//need to call POST /planterbox/settings API with req body of { id: 2 } and take the res from the API to use in the scheduler below

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
        const setting = (await axios.request(config)).data
        return setting
    } catch (error) {
        console.error(error)
        return null
    }
}
console.log(fetchBoxSetting('2'))

//scheduler needs the datetime value from box settings
const dateTime = new Date('1970-01-01T09:00:00.000Z')
const cronArgs = dateTime.getUTCMinutes() +' '+ dateTime.getUTCHours() +' * * *'

let wateringTask = cron.schedule(cronArgs, () => {
    console.log('running')
    timezone:"Asia/Bangkok"
    //put code to trigger watering here; wait for Smart to make code
})
wateringTask.start()