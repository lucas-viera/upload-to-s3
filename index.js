require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");

// Configure AWS credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create an S3 client
const s3 = new AWS.S3();

// Function to upload a file to S3
function uploadFileToS3(bucketName, filePath, fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // Set the parameters for S3 upload
      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: data,
      };

      // Upload the file to S3
      s3.upload(params, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result.Location);
      });
    });
  });
}

const bucketName = "node-onesync-test2";
const filePath = "./uploadFile.txt";
let todayDate = new Date().toJSON().slice(0, 10);
let farmName = "FarmNameTest";
const fileName = `${todayDate}-${farmName}-uploadFile.txt`;

uploadFileToS3(bucketName, filePath, fileName)
  .then((fileLocation) => {
    console.log("File uploaded successfully:", fileLocation);
  })
  .catch((error) => {
    console.error("Error uploading file:", error);
  });

export { uploadFileToS3 };
