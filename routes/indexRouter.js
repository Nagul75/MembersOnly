const {Router} = require('express')
const indexController = require('../controllers/indexController')


const indexRouter = Router()

indexRouter.get("/", indexController.displayMessagesGet)

indexRouter.get("/sign-up", indexController.signUpFormGet)
indexRouter.get("/login", indexController.loginFormGet)

indexRouter.post("/sign-up", indexController.signUpFormPost)
indexRouter.post("/login", indexController.loginFormPost)

module.exports = indexRouter