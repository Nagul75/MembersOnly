const pool = require('./pool')

async function getMessages() {
    const {rows} = await pool.query("SELECT users.firstname, messages.title, messages.message FROM messages JOIN users ON messages.id = users.id ORDER BY messages.created_at DESC;")
}

module.exports = {
    getMessages,
}