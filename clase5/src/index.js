import express from 'express'
import petsRouter from './routes/pets.routes.js'
import usersRouter from './routes/users.routes.js'
import { basePath } from './utils/basePath.js'
import {engine} from 'express-handlebars'
import viewsRouter from './routes/views.routes.js'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()


const httpServer =  createServer(app)

const socketServer = new Server(httpServer)

/* Vistas  */
app.use(express.urlencoded({ extended: true }))
app.use(express.static(basePath + '/public'))
app.engine('hbs',engine({
    extname:'.hbs',
    defaultLayout:'main',
    layoutsDir: basePath + "/src/views/layouts"
}))

app.set("view engine", "hbs")
app.set("views",basePath + "/src/views")

app.use('/adopciones',viewsRouter)
/* Fin Vistas  */

app.use('/api/pets',petsRouter)
app.use('/api/users',usersRouter)


socketServer.on('connection', socket => {
   socket.on("palabra-clave",data => {
        socket.broadcast.emit("palabra-clave",data)
   })
   

})


httpServer.listen(8080,()=> console.log("Server in port 8080"))