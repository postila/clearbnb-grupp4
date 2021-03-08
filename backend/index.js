global.mongoose = require('mongoose')
const express = require('express')
const { users } = require('./models.js')
const app = express()

app.use(express.json())

const atlasUrl = 'mongodb+srv://clearbnb-grupp4:grupp4@cluster0.tzp9m.mongodb.net/clearbnb?retryWrites=true&w=majority'

global.mongoose.connect(atlasUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const models = require('./models.js')

const janeDoe = new users({
  name: 'Jane Doe',
  email: 'janedoe@haha.se',
  password: '123'
})

app.post('/api/users', async (req, res) => {
  let doc = new users(req.body)
  await doc.save()
  res.json(doc)
})

app.listen(3001, () => console.log('Server stated on port 3001'))