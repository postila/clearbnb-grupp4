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

module.exports = {
  users: User
}