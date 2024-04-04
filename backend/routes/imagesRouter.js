
const exp = require('express');
const upload = require('../multer/multer.config');
const { loadImages, uploadImage, deleteImage } = require('../controllers/imagesController');
const router = exp.Router();
router.get('/',loadImages)
router.post('/',upload.single("image"),uploadImage)
router.delete('/:public_id',deleteImage)

module.exports=router;