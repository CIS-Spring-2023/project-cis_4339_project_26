const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()

const app = express()

app.use(
  cors({
    origin: '*'
  })
)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connection Success!')
  })
  .catch((err) => {
    console.error('Mongo Connection Error', err)
  })

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(morgan('dev'))

app.use('/clients', require('./routes/clients'))
app.use('/events', require('./routes/events'))
app.use('/org', require('./routes/org'))

app.use('/services', require('./routes/services'))
app.use('/users', require('./routes/users'))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

app.use(function (err, req, res, next) {
  console.error(err.message, req)
  if (!err.statusCode) {
    err.statusCode = 500
  }
  res.status(err.statusCode).send(err.message)
})
