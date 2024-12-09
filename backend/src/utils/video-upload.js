const crypto = require("crypto");
const ErrorHandler = require("../utils/ErrorHandler");
const { getObjectUrl, UploadFile, deleteFile } = require("../config/s3");

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const UploadVideo = async (file, type) => {
  console.log(type);
  if (!file) {
    throw new ErrorHandler("No file provided", 400);
  }

  const videoName = generateFileName();

  try {
    await UploadFile(file.buffer, videoName, file.mimetype, type);
    const videoUrl = await getObjectUrl(videoName, type);
    return videoUrl;
  } catch (error) {
    console.error("Failed to upload video:", error);
    throw new ErrorHandler("Failed to upload video", 500);
  }
};

const DeleteVideo = async (videoName, type) => {
  if (!videoName) {
    throw new ErrorHandler("Video name must be provided", 400);
  }

  try {
    await deleteFile(videoName, type);
    return true;
  } catch (error) {
    console.error("Failed to delete video:", error);
    throw new ErrorHandler("Failed to delete video", 500);
  }
};

module.exports = { UploadVideo, DeleteVideo };
