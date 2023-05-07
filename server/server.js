const express = require('express')
const cors = require('cors')
// const cookieSession = require('cookie-session');
require('dotenv').config()

const authRouter = require('./routes/authRoute')
const fileRouter = require('./routes/fileRoute');

const app=express()
app.use(express.json())

// app.use(cookieSession({
//     name: 'session-user',
//     secret: process.env.SECRET_SESSION_KEY,
//     maxAge: 1 * 60 * 60 * 1000, // session lasts for 60min
//     httpOnly: true, 
//     // sameSite:'none',
//   }));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,DELETE',
    credentials: true
}))

app.use('/auth', authRouter)
app.use('/file', fileRouter)

app.listen(8080, ()=>{
    console.log("Listening om PORT : 8080")
})