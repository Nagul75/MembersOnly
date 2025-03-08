const pool = require('./pool')

async function getMessages() {
    const {rows} = await pool.query("SELECT users.firstname, messages.title, messages.message FROM messages JOIN users ON messages.id = users.id ORDER BY messages.created_at DESC;")
    return rows
}

async function addUser(user) {
    if(user.admin) {
        const userArr = [user.firstname, user.lastname, user.password, user.email, user.membership, user.username, Boolean(user.admin)]
        await pool.query("INSERT INTO USERS (firstname, lastname, password, email, membership, username, admin) VALUES ($1, $2, $3, $4, $5, $6, $7)", userArr)
    }
    else {
        const userArr = [user.firstname, user.lastname, user.password, user.email, user.membership, false]
        await pool.query("INSERT INTO USERS (firstname, lastname, password, email, membership, username, admin) VALUES ($1, $2, $3, $4, $5, $6, $7)", userArr)
    }
}

module.exports = {
    getMessages,
    addUser
}