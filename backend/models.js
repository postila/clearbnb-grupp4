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

const RentalDate = mongoose.model('RentalDate', {
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodation'
  },
  startDate: Number,
  endDate: Number
})


const Accommodation = mongoose.model('Accommodation', {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  imageUrl: String,
  amenitiesList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Amenity'
  }],
  maxGuest: Number,
  pricePerNight: Number,
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

const Booking = mongoose.model('Booking', {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  accommodation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodation'
  },
  startDate: Number,
  endDate: Number,
  guests: Number,
  totalPrice: Number
})

module.exports = {
  users: User,
  accommodations: Accommodation,
  locations: Location,
  amenities: Amenity,
  bookings: Booking,
  rentaldates: RentalDate
}