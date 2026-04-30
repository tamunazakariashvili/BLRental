const mongoose = require('mongoose');
const geocoder = require('../utils/Geocoder');

const carSchema = mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Car brand is required']
    },
    model: {
        type: String,
        required: [true, 'Car model is required']
    },
    year: {
        type: Number,
        required: [true, 'year is required']
    },
    pricePerDay: {
        type: Number,
        required: [true, 'Price per day is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    images: [String],
    carType: String,
    engine: String,
    transmission: String,
    condition: String,
    mileage: Number,
    fueltype: String,
    countryoforigin: String,
    doors: Number,
    seats: Number,
    pasenger: Number,

    // ლოკაციის სტრუქტურა
    location: {
        address: { type: String, required: true },
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: [44.8271, 41.7151] // თბილისის დეფოლტ კოორდინატები
        }
    },

    description: String,
    phone: String,
    features: {
        airCondition: { type: Boolean, default: false },
        musicSystem: { type: Boolean, default: false },
        toolkit: { type: Boolean, default: false },
        absSystem: { type: Boolean, default: false },
        bluetooth: { type: Boolean, default: false },
        fullBootSpace: { type: Boolean, default: false },
        usbCharger: { type: Boolean, default: false },
        auxInput: { type: Boolean, default: false },
        spareTyre: { type: Boolean, default: false },
        powerSteering: { type: Boolean, default: false },
        powerWindows: { type: Boolean, default: false }
    },
    ratingsAverage: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
});

// ეს ხაზი მნიშვნელოვანია რუკაზე გეო-ძებნისთვის
carSchema.index({ "location": "2dsphere" });

carSchema.pre('save', async function (next) {
    if (!this.isModified('location.address') || !this.location.address) return next();

    try {
        const loc = await geocoder.geocode(this.location.address);

        if (loc && loc.length > 0) {
            // სწორი GeoJSON სტრუქტურა
            this.location = {
                address: this.location.address,
                type: 'Point',
                coordinates: [loc[0].longitude, loc[0].latitude]
            };
        }
        next();
    } catch (err) {
        console.error("Geocoding error: ", err);
        // თუ სერვისი გაითიშა, კოორდინატებს ვტოვებთ დეფოლტზე, რომ ბაზამ არ დაეროროს
        next();
    }
});

const Car = mongoose.model('Car', carSchema, 'cars');
module.exports = Car;