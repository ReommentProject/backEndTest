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

router.get('/rUser', async (req, res) => {
    const client = await connect()
    const query = 'SELECT * FROM users'

    const result = await client.query(query)

    console.log(result.rows)

    await client.end()
    res.send(result.rows)
})

router.post('/cUser', async (req, res) => {
    const client = await connect()
    /**
     * @type {{String, number, String, String | null, Boolean, String | null}}
     */
    const { id, password, nickname, introduce, gender, profileImage } = req.body

    const query = {
        text: 'INSERT INTO users (id, password, nickname, introduce, gender, profile_image) VALUES ($1, $2, $3, $4, $5,$6 )',
        values: [id, password, nickname, introduce, gender, profileImage],
    }
    await client.query(query)

    await client.end()

    res.send(req.body)
})

module.exports = router

