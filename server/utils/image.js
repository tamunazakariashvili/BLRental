const cloudinary = require('../config/cloudinary.js');

const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    resource_type: "image",
    quality: "auto",
    format: "webp",
    transformation: [
        { width: 500, height: 500, crop: "fit", gravity: "center" }
    ]
}

const imageUpload = async (folder, files) => {
    try {
        const uploadPromises = files.map(file =>
            cloudinary.uploader.upload(file, { ...options, folder })
        );
        const results = await Promise.all(uploadPromises);
        return results;
    } catch (err) {
        return { message: "Error uploading image", error: err.message };
    }
}

// ახალი ფუნქცია - სურათების წაშლა
const imageDelete = async (imageUrls) => {
    try {
        const deletePromises = imageUrls.map(url => {
            // URL-დან public_id-ის ამოღება
            // მაგ: https://res.cloudinary.com/demo/image/upload/v123/cars/filename.webp
            // public_id = cars/filename
            const parts = url.split('/');
            const uploadIndex = parts.indexOf('upload');
            const relevantParts = parts.slice(uploadIndex + 2); // v123 გამოვტოვოთ
            const publicIdWithExt = relevantParts.join('/');
            const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ''); // extension მოვაშოროთ

            return cloudinary.uploader.destroy(publicId);
        });

        const results = await Promise.all(deletePromises);
        return results;
    } catch (err) {
        return { message: "Error deleting image", error: err.message };
    }
}

module.exports = { imageUpload, imageDelete };