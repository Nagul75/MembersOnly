const db = require('../db/queries')
const {body, validationResult} = require('express-validator')

const alphaErr = 'must only contain alphabets.'

const validateUser = [
    body("firstname").trim()
     .isAlpha().withMessage("First name: " + alphaErr)
     .isLength({min: 1, max: 10}).withMessage("Last name: " + alphaErr),

    body("lastname").trim()
     .isAlpha().withMessage("First name: " + alphaErr)
     .isLength({min: 1, max: 10}).withMessage("Last name: " + alphaErr),

    body("password").isLength({min: 3}).withMessage("Minimum length of password: 3"),

    body("passwordConfirmation").custom((value, {req}) => {
        return value === req.body.password
    }).withMessage("Confirm password not same as password"),

]

async function displayMessagesGet(req, res) {
    if(!req.user) {
        res.redirect("/sign-up")
    }

    const messages = await db.getMessages()
    res.render("home.ejs", {
        title: "Feed",
        messages: messages
    })
}

async function signUpFormGet(req, res) {
    res.render("sign-up", {
        title: "Sign Up",
    })
}

async function loginFormGet(req, res) {
    res.send("<h1>Login Form will be displayed here - wip </h1>")

}

const signUpFormPost = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).render("sign-up", {
                title: "Sign Up",
                errors: errors.array(),
            })
        }
        //insert code to query database (insert)
    }
]

async function loginFormPost(req, res) {

}


module.exports = {
    displayMessagesGet,
    signUpFormGet,
    signUpFormPost,
    loginFormGet,
    loginFormPost
}