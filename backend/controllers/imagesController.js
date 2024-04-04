const cloundinary = require("../cloudinary/config.cloud");
const cloudFolderName = "tra";

module.exports = {
  loadImages: (req, res) => {
    cloundinary.api
      .resources({ type: "upload", prefix: `${cloudFolderName}/` })
      .then((result) => {
        return res.status(200).json(result.resources);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  deleteImage: (req, res) => {
    var id = req.params.public_id;
    const splitParams = id.split("_");
    const joinedParams = splitParams.join("/");
    cloundinary.uploader.destroy(joinedParams, (error, result) => {
      if (error) {
        return res.status(500).json("There is an error");
      } else {
        return res.status(200).json("Deleted Successfully");
      }
    });
  },
  uploadImage: (req, res) => {
      cloundinary.uploader
        .upload(req.file.path, { folder: "tra", public_id: Math.random() })
        .then((result) => { 
          return res.status(200).json({ message: "Uploaded Successfully" });
        })
        .catch((err) => {    
          return res.status(500).json(err);
        });
   
  },
};
