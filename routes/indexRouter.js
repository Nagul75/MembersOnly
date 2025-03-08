const {Router} = require('express')
const indexController = require('../controllers/indexController')


const indexRouter = Router()

indexRouter.get("/", indexController.displayMessagesGet)

indexRouter.get("/sign-up", indexController.signUpFormGet)
indexRouter.get("/login", indexController.loginFormGet)
indexRouter.get("/new-message", indexController.newMessageFormGet)
indexRouter.get('/logout', indexController.logoutGet)

indexRouter.post("/sign-up", indexController.signUpFormPost)
indexRouter.post("/login", indexController.loginFormPost)
indexRouter.post('/new-message', indexController.newMessageFormPost)



module.exports = indexRouter