const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const defaultBucket = process.env.AWS_BUCKET;
const videosBucket = process.env.AWS_VIDEOS_BUCKET;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

function UploadFile(fileBuffer, fileName, mimetype, type) {
  const bucket = type?.video ? videosBucket : defaultBucket;

  const uploadParams = {
    Bucket: bucket,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
  };

  return s3Client.send(new PutObjectCommand(uploadParams));
}

async function getObjectSignedUrl(fileName, type) {
  const bucket = type?.video ? videosBucket : defaultBucket;

  const params = {
    Bucket: bucket,
    Key: fileName,
  };

  const command = new GetObjectCommand(params);
  const seconds = 600000;

  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url;
}

async function getObjectUrl(imageName, type) {
  const bucket = type?.video ? videosBucket : defaultBucket;

  console.log(bucket);
  const ObjectUrl = `https://${bucket}.s3.${region}.amazonaws.com/${imageName}`;

  return ObjectUrl;
}

async function deleteFile(fileName, type) {
  const bucket = type?.video ? videosBucket : defaultBucket;

  console.log(bucket);
  const deleteParams = {
    Bucket: bucket,
    Key: fileName,
  };

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

module.exports = {
  UploadFile,
  getObjectSignedUrl,
  getObjectUrl,
  deleteFile,
};
