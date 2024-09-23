import express from "express";
import mongoose from "mongoose";
import path from "path";
import __dirname from "./dirname.utils.js";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import userRouter from "./router/user.router.js";
import petRouter from "./router/pet.router.js";
import viewsRouter from "./router/views.router.js";


//INICIALIZAMOS APP
const app = express()
const PORT = 8080
 
//EXPRESS CONFIG
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

//HANDLEBARS CONFIG
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "main"
}))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))

//MONGOOSE CONFIG
mongoose.connect('mongodb+srv://simonsolat:Gordosexotkm1@cluster0.cjjajx4.mongodb.net/', {dbName: 'EntregaBackEnd3'}).then(()=>{console.log("conectado a mongo")}).catch((error)=>{console.log(`Error al conectar a mongo: ${error}`)})

//ROUTES CONFIG
app.use("/api/pets", petRouter)
app.use("/api/user", userRouter)
app.use('/', viewsRouter)

//START SERVER
app.listen(PORT, ()=>{
    console.log(`Server corriendo en http://localhost:${PORT}`)
})