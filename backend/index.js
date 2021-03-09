global.mongoose = require('mongoose')
const express = require('express')
const { users } = require('./models.js')
const app = express()
const session = require('express-session')

app.use(express.json())

const atlasUrl = 'mongodb+srv://clearbnb-grupp4:grupp4@cluster0.tzp9m.mongodb.net/clearbnb?retryWrites=true&w=majority'

global.mongoose.connect(atlasUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const models = require('./models.js')

app.get('/api/users', async (req, res) => {
  let docs = await users.find()
  await res.json(docs)
})

app.post('/api/users', async (req, res) => {
  let doc = new users(req.body)
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