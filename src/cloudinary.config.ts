import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    secret_key: process.env.SECRET_KEY
});


export const uploadImageCloudinary = async (image) => {
    const result = await cloudinary.uploader.upload(image);
    return result;
}