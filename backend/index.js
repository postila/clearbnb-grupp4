global.mongoose = require('mongoose')
const express = require('express')
const { users, locations, accommodations, amenities, bookings, rentaldates } = require('./models.js')
const app = express()
const session = require('express-session')
const crypto = require('crypto')
const connectMongo = require('connect-mongo')(session)

const salt = 'kljkfdjldkönbmnbdmw'

app.use(express.json())



const atlasUrl = 'mongodb+srv://clearbnb-grupp4:grupp4@cluster0.tzp9m.mongodb.net/clearbnb?retryWrites=true&w=majority'

global.mongoose.connect(atlasUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(session({
  secret: 'asdf', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new connectMongo({ mongooseConnection: mongoose.connection })
}));

app.get('/rest/users', async (req, res) => {
  let docs = await users.find()
  res.json(docs)
})

app.post('/api/users', async (req, res) => {
  const hash = crypto.createHmac('sha256', salt).update(req.body.password).digest('hex')
  let user = new users({...req.body, password: hash})
  await user.save()
  res.json({success: true})
})

app.get('/rest/locations', async (req, res) => {
  let docs = await locations.find()
  res.json(docs)
})

app.get('/rest/locations/:id', async (req, res) => {
  let doc = await locations.findById(req.params.id)
  res.json(doc)
})

app.get('/rest/accommodations', async (req, res) => {
  let docs = await accommodations.find().populate(['amenitiesList', 'location', 'user']).exec()
  res.json(docs)
})

app.post('/api/accommodations', async (req, res) => {
  let doc = new accommodations(req.body)
  await doc.save()
  res.json(doc)
})

app.get('/rest/amenities', async (req, res) => {
  let docs = await amenities.find()
  res.json(docs)
})

app.put('/api/accommodation/:id', async (req, res) => {
  let accommodation = await accommodations.findById(req.params.id)

  if (req.body.amenetiesList) {
    accommodation.amenitiesList = [...accommodation.amenetiesList, ...req.body.amenetiesList]
    delete req.body.amenetiesList
  }

  Object.assign(accommodation, req.body)
  await accommodation.save()
  res.json(accommodation)
})

app.get('/rest/accommodation/:id', async (req, res) => {
  let doc = await accommodations.findById(req.params.id)
  res.json(doc)
})

app.get('/api/accommodationDetails/:id', async (req, res) => {
  let doc = await accommodations.findById(req.params.id)
  res.json(doc)
})

app.post('/api/booking', async (req, res) => {
  let booking = new bookings(req.body)
  await booking.save()
  res.json(booking)
})

app.get('/rest/bookings', async (req, res) => {
  let docs = await bookings.find().populate(['user', 'accommodation']).exec()
  res.json(docs)
})

app.get('/rest/bookings/:id', async (req, res) => {
  let accommodation = await accommodations.findById(req.params.id)
  let doc = await bookings.find({accommodation:accommodation._id})
  res.json(doc)
})

app.post('/api/login', async (req, res) => {
  if (req.session.user) {
    res.json({ error: 'Någon är redan inloggad' })
    return
  }
  
  const hash = crypto.createHmac('sha256', salt).update(req.body.password).digest('hex')

  let user = await users.findOne({ email: req.body.email, password: hash })
  if (user) {
    req.session.user = user
    res.json({success: 'Du är inloggad'})
  }
  else {
    res.json({error: 'Något gick fel'})
  }

})

app.delete('/api/logout', async (req, res) => {
  if (req.session.user) {
    delete req.session.user;
    res.json({ success: 'Du är utloggad' });
  }
  else {
    res.json({ error: 'Du var aldrig inloggad' });
  }
})

app.get('/api/whoami', (req, res) => {
  if (req.session.user) {
    let user = { ...req.session.user }
    delete user.password
    res.json(user)
  }
  else {
    res.json({ error: 'Inte inloggad' })
  }
})



app.listen(3001, () => console.log('Server stated on port 3001'))