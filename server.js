const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(express.json())

const Dbconnet = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/local')
    app.listen(4000, () =>
      console.log('Server is running at http://localhost:4000/'),
    )
  } catch (e) {
    console.log(`DB Error ${e.message}`)
    process.exit(1)
  }
}

Dbconnet()

const serverSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: true },
})
const userData = mongoose.model('users', serverSchema)
//testing api
app.get('/users', async (req, res) => {
  const data = await userData.find()
  res.send(data)
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const data = await userData.findOne({ username: `${username}` })
  if (data === null) {
    res.statusCode = 400
    const error = 'user does not exists'
    res.send({ error })
  } else {
    if (password === data.password) {
      res.statusCode = 200
      const payload = {
        username: username,
      }
      const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN')
      res.send({ jwtToken })
    } else {
      res.statusCode = 400
      const error = 'incorrect password'
      res.send({ error })
    }
  }
})
