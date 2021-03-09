const mongoose = global.mongoose

const User = mongoose.model('User', {
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const Location = mongoose.model('Location', {
  name: String,
  imageUrl: String
})

module.exports = {
  users: User,
  locations: Location
}