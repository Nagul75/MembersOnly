const {Pool} = require('pg')

module.exports = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: "MembersOnly",
    port: Number(process.env.PGPORT),
    host: "localhost"
})

