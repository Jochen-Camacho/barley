const {
  BUCKET_NAME,
  BUCKET_REGION,
  ACCESS_KEY,
  SECRET_ACCESS_KEY,
} = require("./config");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

if (!BUCKET_NAME || !BUCKET_REGION || !ACCESS_KEY || !SECRET_ACCESS_KEY) {
  throw new Error("AWS S3 credentials not provided");
}

const client = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  region: BUCKET_REGION,
});

function getImage(imageName) {
  return `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${imageName}`;
}

async function putImage(buffer, fileName, contentType) {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
    };
    const command = new PutObjectCommand(params);
    await client.send(command);
    return getImage(fileName);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { putImage, getImage };
