const db = require('../db/queries')

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

async function signUpFormPost(req, res) {
    console.log(req.body)
    res.redirect("/login")
}

async function loginFormPost(req, res) {

}


module.exports = {
    displayMessagesGet,
    signUpFormGet,
    signUpFormPost,
    loginFormGet,
    loginFormPost
}