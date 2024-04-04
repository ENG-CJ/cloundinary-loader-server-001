
const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag", folder: 'tra'  }, 
  function(error, result) {console.log(result); });

// const publicId = 'tra/olympic_flag';

// const imageUrl = cloudinary.url(publicId);

// console.log('Image URL:', imageUrl);

const publicId = 'tra/olympic_flag';
cloudinary.uploader.destroy(publicId, (error, result) => {
  if (error) {
    console.log('Delete error:', error);
    // Handle error
  } else {
    console.log('Delete result:', result);
    // Handle result
  }
});


// all images
// const folderName = 'tra';

// cloudinary.api.resources({ type: 'upload', prefix: `${folderName}/` })
//   .then(result => {
//     console.log('Result:', result.resources);
//     // Handle result (array of images)
//   })
//   .catch(error => {
//     console.log('Error:', error);
//     // Handle error
//   });