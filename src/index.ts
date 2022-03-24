import { Application } from 'express'
import * as express from 'express'
import userRouter from './Routes/user.routes'

const app: Application = express()
const port: String = process.env.PORT || '3000'

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//To apply router for enhancing folder structure, the app.use() must be applied.
//@TO-DO: FIX schema in prisma folder to fit with original schema. 
app.use('/user',userRouter)

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`)
})