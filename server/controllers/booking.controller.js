const Booking = require("../models/booking.model");
const Car = require("../models/car.model");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");
const { imageUpload, imageDelete, } = require("../utils/image");

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

    // --- იმეილის გაგზავნის ლოგიკა შენთან (ადმინთან) ---
    const recipientEmail = "tamunazakariashvili@gmail.com"; // ვისთან მივიდეს (მიმღები)
    const subject = "ახალი ჯავშანი საიტზე! 🚗";

    const htmlContent = `
    <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h2 style="color: #2c3e50;">მოვიდა ახალი შეკვეთა!</h2>
        <p><strong>მანქანა:</strong> ${car.brand} ${car.model}</p>
        <p><strong>მომხმარებელი:</strong> ${req.user.fullname}</p>
        <p><strong>ტელეფონი:</strong> ${phone}</p>
        <p><strong>ლოკაცია:</strong> ${pickupLocation}</p>
        <p><strong>პერიოდი:</strong> ${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}</p>
        <p><strong>ჯამური ფასი:</strong> ${totalPrice} GEL</p>
        <hr>
        <p style="font-size: 12px; color: #777;">გამომგზავნი: NovaRide System (${process.env.BREVO_SENDER})</p>
    </div>
`;

    // ვიძახებთ ფუნქციას
    // პირველი პარამეტრი არის თამუნას იმეილი (email)
    // მეორე - სათაური (subject)
    // მესამე - უბრალო ტექსტი (text)
    // მეოთხე - HTML ვერსია (html)
    sendEmail(
        recipientEmail,
        subject,
        `ახალი შეკვეთა: ${car.brand} ${car.model}`,
        htmlContent
    );
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
    const deletedBooking = await Booking.findById(req.params.id);

    if (!deletedBooking) {
        return next(new AppError('Booking not found', 404));
    }

    // Cloudinary-დან მართვის მოწმობის წაშლა
    if (deletedBooking.driverLicenseImg) {
        await imageDelete([deletedBooking.driverLicenseImg]);
    }

    await Booking.findByIdAndDelete(req.params.id);

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