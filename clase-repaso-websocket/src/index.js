import express from 'express'
import usersRouter from './routes/users.routes.js'
import { basePath } from './utils/basePath.js'
import {engine} from 'express-handlebars'
import viewsRouter from './routes/views.routes.js'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()


const httpServer =  createServer(app)

export const socketServer = new Server(httpServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(basePath + '/public'))
app.engine('hbs',engine({
    extname:'.hbs',
    defaultLayout:'main',
    layoutsDir: basePath + "/src/views/layouts"
}))

app.set("view engine", "hbs")
app.set("views",basePath + "/src/views")

//routes
app.use('/',viewsRouter)
app.use('/api/users',usersRouter)



socketServer.on('connection', socket => {
  console.log("Cliente conectado:", socket.id)
})


httpServer.listen(8080,()=> console.log("Server in port 8080"))