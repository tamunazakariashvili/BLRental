const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: [true, 'Car is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    // ტურისტის ძირითადი მონაცემები
    phone: { 
        type: String, 
        required: [true, 'Phone number is required'] 
    },
    pickupLocation: { 
        type: String, 
        required: [true, 'Pickup location is required'] 
    },
    
    // მართვის მოწმობის სურათის ლინკი
    driverLicenseImg: { 
        type: String, 
        required: [false, 'Driver license image is optional but recommended'] 
    },

    // თარიღები და ფასი
    startDate: { 
        type: Date, 
        required: [true, 'Start date is required'] 
    },
    endDate: { 
        type: Date, 
        required: [true, 'End date is required'] 
    },
    totalPrice: { 
        type: Number, 
        required: true 
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    createdAt: { 
        type: Date,
        default: Date.now 
    }
});


const Booking = mongoose.model('Booking', bookingSchema, 'booking');
module.exports = Booking;