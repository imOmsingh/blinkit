const router = require('express').Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: "./public/uploaded-images",
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
  });

  const upload = multer({ storage: storage });

  router.post('/uploadimage', upload.single('image') ,async (req, res, next) => {
    try {
        // console.log(JSON.stringify(req.file))
        return res.status(201).send('Image uploaded succesfully')
    } catch (error) {
        return res.status(500).json({success:false,message:"User already exist"});
    }
  })

module.exports = router;