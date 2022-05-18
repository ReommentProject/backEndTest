const express = require('express')

const router = express.Router()
router.use(express.json())
// router.use(express.urlencoded({ extended: true }))

// const userDB = require('../DB/users')

const { Client } = require('pg') // postgreSQL

async function connect() {
    const client = new Client({
        user: 'androiduser',
        password: '5654',
        database: 'android2022',
    })
    await client.connect()
    return client
}

router.get('/', async (req, res) => {
    const client = await connect()
    const query = 'SELECT * FROM users'

    const result = await client.query(query)

    console.log(result.rows)

    await client.end()
    res.send(result.rows)
})

router.post('/cUser', async (req, res) => {
    const client = await connect()
    const { name, age } = req.body

    console.log(req.body.age)

    // 스트링변수에 req.body.age 를 대입해서 실행
    // 일단 타입이랑, 안에 있는 내용 출력할거임

    const query = {
        text: 'INSERT INTO users (name, age) VALUES ($1, $2)',
        values: [`${req.body.name}`, req.body.age],
    }
    await client.query(query)

    await client.end()

    res.send(req.body)
})

module.exports = router

