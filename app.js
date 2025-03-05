const express = require('express')
const session = require('express-session')
const indexRouter = require('./routes/indexRouter')

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

app.use("/", indexRouter)

app.listen(8000, () => {
    console.log("App listening on PORT: 8000")
})