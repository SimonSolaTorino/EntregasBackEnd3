import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import session from 'express-session';
import swaggerSetup from './swagger.js';
import dotenv from 'dotenv';
import __dirname from "./dirname.js";
import userRouter from "./router/user.router.js";
import petRouter from "./router/pet.router.js";
import viewsRouter from "./router/views.router.js";
import mocksRouter from "./router/mocks.router.js";

//DOTENV CONGIG
dotenv.config()

//INICIALIZAMOS APP
const app = express()
const PORT = process.env.PORT || 3000

//EXPRESS CONFIG
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

//SESSION CONFIG
const SECRET_KEY = process.env.SECRET_KEY
app.use(
    session({
        secret: SECRET_KEY, 
        resave: false,
        saveUninitialized: false,
        cookie: {
        maxAge: 1000 * 60 * 60, // 1 hora de duración de la cookie
        },
    }))

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.userId ? true : false;
    res.locals.userEmail = req.session.userEmail || '';
    res.locals.userName = req.session.userName || '';
    next();
     
})

//HANDLEBARS CONFIG
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "main"
}))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))

//MONGOOSE CONFIG
const DB_URL = process.env.DB_URI
const DB_NAME = process.env.DB_NAME
mongoose.connect(DB_URL, {dbName: DB_NAME}).then(()=>{console.log("conectado a mongo")}).catch((error)=>{console.log(`Error al conectar a mongo: ${error}`)})

//SWAGGER CONFIG
swaggerSetup(app)

//ROUTES CONFIG
app.use("/api/pets", petRouter)
app.use("/api/user", userRouter)
app.use("/api/mocks", mocksRouter)
app.use('/', viewsRouter)

//START SERVER
app.listen(PORT, ()=>{
    console.log(`Server corriendo en http://localhost:${PORT}`)
})