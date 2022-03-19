import {Request,Response,Application} from 'express'
import * as express from 'express'

const app:Application = express()
const port:Number = 3000
app.get('/', (req:Request, res:Response) => {
    res.send('Well done!')
})

app.listen(port, () => {
console.log(`The application is listening on port ${port}!`)
})