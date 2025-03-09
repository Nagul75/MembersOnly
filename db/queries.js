const pool = require('./pool')

async function getMessages() {
    const {rows} = await pool.query("SELECT users.firstname, users.admin, messages.title, messages.message, messages.created_at, messages.message_id FROM messages JOIN users ON messages.id = users.id ORDER BY messages.created_at DESC;")
    return rows
}

async function addUser(user) {
    if(user.admin) {
        const userArr = [user.firstname, user.lastname, user.password, user.email, user.membership, user.username, Boolean(user.admin)]
        await pool.query("INSERT INTO users (firstname, lastname, password, email, membership, username, admin) VALUES ($1, $2, $3, $4, $5, $6, $7)", userArr)
    }
    else {
        const userArr = [user.firstname, user.lastname, user.password, user.email, user.membership, user.username, false]
        await pool.query("INSERT INTO users (firstname, lastname, password, email, membership, username, admin) VALUES ($1, $2, $3, $4, $5, $6, $7)", userArr)
    }
}

async function createNewMessage(id, title, message) {
    await pool.query("INSERT INTO messages (id, title, message) VALUES ($1, $2, $3)", [id, title, message])
}

async function deleteMessage(id) {
    await pool.query("DELETE FROM messages WHERE message_id = $1", [id])
}

module.exports = {
    getMessages,
    addUser,
    createNewMessage,
    deleteMessage
}