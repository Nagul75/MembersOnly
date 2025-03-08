const express = require('express')
const session = require('express-session')
const indexRouter = require('./routes/indexRouter')
const pool = require('./db/pool')
const pgStore = require('connect-pg-simple')(session)
const passport = require('./auth/passport')

const app = express()

const sessionStore = new pgStore({
    pool: pool,
    tableName: "user_sessions",
    createTableIfMissing: true
})

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.session())

app.use("/", indexRouter)

app.listen(8000, () => {
    console.log("App listening on PORT: 8000")
})