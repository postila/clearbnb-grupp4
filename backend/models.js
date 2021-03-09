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

const Accommodation = mongoose.model('Accommodation', {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  imageUrl: String,
  amenitiesList: Array,
  maxGuest: Number,
  pricePerNight: Number,
  description: String,
  bookedDatesList: Array,
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  }
})

module.exports = {
  users: User,
  accommodations: Accommodation
}