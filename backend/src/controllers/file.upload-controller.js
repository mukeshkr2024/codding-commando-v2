require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const CatchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

aws.config.update({
  region: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fileName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

const singleUploader = upload.single("image");

const uploadImage = CatchAsyncError(async (req, res, next) => {
  try {
    singleUploader(req, res, function (err) {
      if (err) {
        return res.status(500).json({ error: "File upload failed" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
      }

      const payload = { ...req.body, image: req.file.location };

      return res.status(201).json({
        success: true,
        message: "Successfully created a new tweet",
        data: payload,
      });
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

module.exports = uploadImage;
