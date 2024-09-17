import express from 'express'
import config from './src/utils/config.js'
import cors from 'cors'
import appRoutes from './src/routes/index.router.js'

const app=express()
app.use(cors())
app.use(express.json({limit: '5mb'}))

app.use(appRoutes)

app.listen(config.PORT,()=>console.log(`Server is running/listening on ${config.PORT} `))
