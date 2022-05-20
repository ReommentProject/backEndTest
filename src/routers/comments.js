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

router.get('/rComment', async (req, res) => {
    const client = await connect()
    const query = 'SELECT * FROM comments'

    const result = await client.query(query)

    console.log(result.rows)

    await client.end()
    res.send(result.rows)
})

router.post('/cComment', async (req, res) => {
    const client = await connect()
    /**
     * @type {{number, String, number, String, String}}
     */
    const { commentID, userID, postID, content, updateTime } = req.body

    const query = {
        text: 'INSERT INTO users (comment_id, user_id, post_id, content, update_time) VALUES ($1, $2, $3, $4, $5,$6 )',
        values: [commentID, userID, postID, content, updateTime],
    }
    await client.query(query)

    await client.end()

    res.send(req.body)
})

module.exports = router

