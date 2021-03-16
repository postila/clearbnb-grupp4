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
  title: String,
  imageUrl: String,
  amenitiesList: [{
    washer: Boolean,
    wifi: Boolean,
    essentials: Boolean,
    kitchen: Boolean,
    TV: Boolean,
    airConditioning: Boolean,
    iron: Boolean,
    safe: Boolean
  }],
  maxGuests: Number,
  pricePerNight: Number,
  startDate: Number,
  endDate: Number,
  description: String,
  bookedDatesList: Array,
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  }
})

const Location = mongoose.model('Location', {
  name: String,
  imageUrl: String
})
const Amenity = mongoose.model('Amenity', {
  name: String,
  icronUrl: String
})

module.exports = {
  users: User,
  accommodations: Accommodation,
  locations: Location,
  amenities: Amenity
}