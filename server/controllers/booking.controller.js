const Booking = require("../models/booking.model");
const Car = require("../models/car.model");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const imageUpload = require("../utils/image");

const createBooking = catchAsync(async (req, res, next) => {
    const { carId, startDate, endDate, phone, pickupLocation } = req.body;
    const userId = req.user._id;

    let driverLicenseUrl = "";

    // Multer.single-ის შემთხვევაში ფაილი არის req.file-ში
    if (req.file) {
        // imageUpload-ს სჭირდება მასივი [req.file.path]
        const uploadResult = await imageUpload("driver_licenses", [req.file.path]);

        if (uploadResult && uploadResult[0]) {
            driverLicenseUrl = uploadResult[0].secure_url;
        }
    }

    const car = await Car.findById(carId);
    if (!car) return next(new AppError("Car not found", 404));

    // თარიღების ვალიდაცია
    if (new Date(endDate) <= new Date(startDate)) {
        return next(new AppError("Return date must be after pick-up date", 400));
    }

    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const duration = days <= 0 ? 1 : days;
    const totalPrice = duration * car.pricePerDay;

    const newBooking = await Booking.create({
        car: carId,
        user: userId,
        phone,
        pickupLocation,
        driverLicenseImg: driverLicenseUrl,
        startDate,
        endDate,
        totalPrice
    });

    res.status(201).json({
        status: "success",
        booking: newBooking
    });
});

const updateExpiredBookings = async () => {
    const now = new Date();
    await Booking.updateMany(
        {
            endDate: { $lt: now },
            status: 'confirmed'
        },
        {
            status: 'completed'
        }
    );
};

const getAllBookings = catchAsync(async (req, res, next) => {
    await updateExpiredBookings();
    const bookings = await Booking.find()
        .populate('user', 'fullname email') 
        .populate('car', 'brand model year pricePerDay');

    res.status(200).json({
        status: 'success',
        results: bookings.length,
        bookings
    });
});

const getBooking = catchAsync(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id)
        .populate('user', 'fullname email')
        .populate('car', 'brand model year');

    if (!booking) {
        return next(new AppError('Booking not found', 404));
    }

    res.status(200).json({
        status: 'success',
        booking
    });
});

const updateBooking = catchAsync(async (req, res, next) => {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).populate('car user');

    if (!updatedBooking) {
        return next(new AppError('Booking not found', 404));
    }

    res.status(200).json({
        status: 'success',
        booking: updatedBooking
    });
});

const deleteBooking = catchAsync(async (req, res, next) => {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
        return next(new AppError('Booking not found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Booking deleted successfully'
    });
});

const getMyBookings = catchAsync(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user.id })
        .populate('car', 'brand model year images');

    res.status(200).json({
        status: 'success',
        bookings
    });
});

// ექსპორტი
module.exports = {
    createBooking,
    getAllBookings,
    getBooking,
    deleteBooking,
    updateBooking,
    getMyBookings
};