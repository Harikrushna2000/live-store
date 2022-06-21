const express = require('express');
const multer = require('multer');
const router = express.Router();

const CategoryController = require('../controller/category');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/categories/")
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

router.get('/category', CategoryController.get_all);

router.post('/category', upload.single('categoryImg'), CategoryController.create);

router.get('/category/:Categories_id', CategoryController.get);

router.put('/category/:Categories_id', upload.single('categoryImg'), CategoryController.update);

router.put('/category/flag/:Categories_id', CategoryController.update_flag);

router.delete('/category/:Categories_id', CategoryController.delete);

module.exports = router;
