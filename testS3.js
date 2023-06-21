const index = require("./index.js");

// Specify the bucket name, file path, and desired file name
const bucketName = "node-onesync-test2";
const filePath = "./uploadFile.txt";
const fileName = "uploadFile.txt";

// Use the utility function to upload the file to S3
index
  .uploadFileToS3(bucketName, filePath, fileName)
  .then((fileLocation) => {
    console.log("File uploaded successfully:", fileLocation);
  })
  .catch((error) => {
    console.error("Error uploading file:", error);
  });
