const mongoose = global.mongoose

const Register = mongoose.model('Register', {
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

const User = mongoose.model('User', {
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
})

module.exports = {
  register: Register,
  users: User
}