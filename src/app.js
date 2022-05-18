// @ts-check

const express = require('express')

const app = express()

const userRouter = require('./routers/users')
const commentRouter = require('./routers/comments')
const friendRouter = require('./routers/friends')
const postRouter = require('./routers/posts')
const userInterestRouter = require('./routers/user_interest')

app.use('/users', userRouter)
app.use('/comments', commentRouter)
app.use('/friends', friendRouter)
app.use('/posts', postRouter)
app.use('userInterest', userInterestRouter)

// app.use((err, req, res, next) => {
//     res.statusCode = err.statusCode || 500
//     res.send(err.message)
// })

module.exports = app

