const express = require('express')

const router = express.Router()
router.use(express.json())

const { Client } = require('pg') // postgreSQL

async function connect() {
    const client = new Client({
        user: 'androiduser',
        password: '5654',
        database: 'android2022_2',
    })
    await client.connect()
    return client
}

router.get('/', async (req, res) => {
    const client = await connect()
    const query = 'SELECT * FROM friends'

    const result = await client.query(query)

    console.log(result.rows)

    await client.end()
    res.send(result.rows)
})

module.exports = router

