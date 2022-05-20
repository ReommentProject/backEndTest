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

router.get('/rPost', async (req, res) => {
    const client = await connect()
    const query = 'SELECT * FROM posts'

    const result = await client.query(query)

    console.log(result.rows)

    await client.end()
    res.send(result.rows)
})

router.post('/cPost', async (req, res) => {
    const client = await connect()
    /**
     * @type {{number, String, number, String, String, String, String, String}}
     */
    const {
        postID,
        userID,
        postLike,
        title,
        content,
        thumbnail,
        videoLink,
        updateTime,
    } = req.body

    const query = {
        text:
            'INSERT INTO users (post_id, user_id, post_like, title, content, thumbnail, video_link, update_time) ' +
            'VALUES ($1, $2, $3, $4, $5,$6, $7, $8 )',
        values: [
            postID,
            userID,
            postLike,
            title,
            content,
            thumbnail,
            videoLink,
            updateTime,
        ],
    }
    await client.query(query)

    await client.end()

    res.send(req.body)
})

module.exports = router

