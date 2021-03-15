global.mongoose = require('mongoose')
const express = require('express')
const { users, locations, accommodations, amenities, bookings, rentaldates } = require('./models.js')
const app = express()
const session = require('express-session')

app.use(express.json())

const atlasUrl = 'mongodb+srv://clearbnb-grupp4:grupp4@cluster0.tzp9m.mongodb.net/clearbnb?retryWrites=true&w=majority'

global.mongoose.connect(atlasUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const models = require('./models.js')
const { useParams } = require('react-router-dom')

app.get('/api/users', async (req, res) => {
  let docs = await users.find()
  await res.json(docs)
})

app.post('/api/users', async (req, res) => {
  let doc = new users(req.body)
  await doc.save()
  res.json(doc)
})

app.get('/rest/locations', async (req, res) => {
  let docs = await locations.find()
  await res.json(docs)
})

app.get('/rest/locations/:id', async (req, res) => {
  let doc = await locations.findById(req.params.id)
  await res.json(doc)
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
  await res.json(docs)
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
  let doc = await accommodations.findById(req.params.id).populate(['amenitiesList']).exec()
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

app.post('/rest/dates', async (req, res) => {
  let doc = new rentaldates(req.body)
  await doc.save()
  res.json(doc)
})

app.get('/api/login', async (req, res) => {
  if (session("current-member") != null) {
    res.send("Already logged in");
    return;
  }

  let doc = new users(req.body)
  session("current-member", doc)
  // let user = await users(req.body);

  // User = collection("User").findOne(ObjectFilters.eq("email", user.getEmail()));
  // if (userInColl == null) {
  // No user with matching email
  // res.json(User);
  // await doc.save()
  res.json(doc);
  //   return;
  // }

  // validate password
  // if (HashPassword.match(user.getPassword() + secretSalt, userInColl.getPassword())) {
  //   // correct -> login
  //   //userInColl.setPassword(null);
  //   req.session("current-user", userInColl);
  //   res.json(userInColl);
  // } else {
  //   // wrong password
  //   res.send("Bad credentials");
  // }

})

app.get('/api/logout', async (req, res) => {
  session("current-member")
  res.send('Logged out')
})

app.listen(3001, () => console.log('Server stated on port 3001'))