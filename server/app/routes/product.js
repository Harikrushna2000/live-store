const express = require("express");
const multer = require('multer');

const router = express.Router();

const ProductController = require('../controller/product');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.fieldname + ".jpg")
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/product', ProductController.get_all);

router.post('/product', upload.single('productImg'), ProductController.create);

router.get('/product/:products_id', ProductController.get);

router.put('/product/:products_id', upload.single('productImg'), ProductController.update);

router.put('/product/flag/:Products_id', ProductController.update_flag);

router.delete('/product/:Products_id', ProductController.delete);

module.exports = router;
