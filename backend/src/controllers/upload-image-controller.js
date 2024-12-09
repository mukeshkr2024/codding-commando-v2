const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");
const CatchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const {
  UploadFile,
  getObjectSignedUrl,
  getObjectUrl,
} = require("../config/s3");

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const UploadImageApi = CatchAsyncError(async (req, res, next) => {
  try {
    const file = req.file;
    const imageName = generateFileName();
    const fileBuffer = await sharp(file.buffer).toBuffer();

    await UploadFile(fileBuffer, imageName, file.mimetype);

    const imageUrl = await getObjectUrl(imageName);

    // const imageUrl = await getObjectSignedUrl(imageName);

    // Respond to the client
    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: imageUrl,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = UploadImageApi;
