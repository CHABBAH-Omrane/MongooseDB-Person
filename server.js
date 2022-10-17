const express = require("express")
const app = express()
const mongoose =require('mongoose')

const port =5000
app.use(express.json())
mongoose.connect("mongodb+srv://*******:********@cluster0.raunanq.mongodb.net/MyFirstDatabase?retryWrites=true&w=majority",
()=>console.log("database is connected"))


app.use('/',require("./routes/useRoutes.js"))

app.listen(port,()=>console.log("listening in port 5000"))
