const db = require('../db/queries')
const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator')
const passport = require('../auth/passport')

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
        messages: messages,
    })
}

async function signUpFormGet(req, res) {
    res.render("sign-up", {
        title: "Sign Up",
    })
}

async function loginFormGet(req, res) {
    res.render("login", {
        title: "login",
    })
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
        if(req.body.secretMemberPassword === "kitty") {
            req.body.membership = true
        } else {
            req.body.membership = false
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        await db.addUser(req.body)
    }
]

async function loginFormPost(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);  // Handle error, if any
        }
        if (!user) {
            return res.redirect('/login');  // If user is not found, redirect to login
        }

        req.login(user, (err) => {  // Log the user in and create a session
            if (err) {
                return next(err);  // Handle login error
            }
            return res.redirect('/');  // Redirect to home page after successful login
        });
    })(req, res, next);  // This part invokes the passport.authenticate() function with req, res, next
}

async function logoutGet(req, res, next) {
    req.logout((err) => {
        if(err) {
            return next(err)
        }
        res.redirect("/login")
    })
}

async function newMessageFormGet(req, res) {
    res.render("newMessageForm", {
        title: "New Message"
    })
}

async function newMessageFormPost(req, res) {
    await db.createNewMessage(req.user.id, req.body.title, req.body.message)
    res.redirect("/")
}

module.exports = {
    displayMessagesGet,
    signUpFormGet,
    signUpFormPost,
    loginFormGet,
    loginFormPost,
    logoutGet,
    newMessageFormGet,
    newMessageFormPost
}