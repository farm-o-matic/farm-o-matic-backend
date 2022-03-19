import {Response,Application} from 'express'
import * as express from 'express'

const app:Application = express()

app.get('/', (req, res:Response) => {
    res.send('Well done!')
})

app.listen(3000, () => {
console.log('The application is listening on port 3000!')
})