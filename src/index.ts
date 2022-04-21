import {Response, Request, Application} from 'express'
import * as express from 'express'
import userRouter from './Routes/user.routes'
import planterboxRouter from './Routes/planterbox.routes'
import pbsettingRouter from './Routes/pbsetting.routes'
import schedulerRouter from './Routes/scheduler.routes'
const cron = require('node-cron')

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

//scheduler
const dateTime = new Date('1970-01-01T23:17:00.000Z')
const cronArgs = dateTime.getUTCMinutes() +' '+ dateTime.getUTCHours() +' * * *'

var wateringTask = cron.schedule(cronArgs, () => {
    console.log('running')
    timezone:"Asia/Bangkok"
    //put code to trigger watering here
})

wateringTask.start()