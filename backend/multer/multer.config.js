const multer = require("multer");

const multerUpload = multer.diskStorage({
    filename: (req,file,cb)=>{
        cb(null,file.originalname);
    }
})

const uploadStorage = multer({
    storage: multerUpload
})

module.exports=uploadStorage;