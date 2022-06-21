const mongoose = require('mongoose');
const Categories = require('../models/category');

exports.get_all = (request, response, next) => {
    Categories.find({}, {
        categoryName: 1,
        categoryCode: 1,
        categoryImg: 1,
        categoryFlag: 1
    })
        .then(result => {
            response.status(200).json({
                count: result.length,
                data: result
            });
        })
        .catch(err => {
            response.status(500).json({
                error: err
            });
        });
}

exports.create = (request, response, next) => {
    const categories = new Categories({
        _id: mongoose.Types.ObjectId(),
        categoryName: request.body.categoryName,
        categoryFlag: true
    });
    categories.categoryImg = !request.file ? 'http://localhost:5000/uploads/categories/no_image.jpg' : "http://localhost:5000/uploads/categories/" + request.file.filename,
        Categories.findOne({}, { categoryCode: 1, }).sort({ '_id': -1 }).limit(1).then(result => {
            if (result) {
                const tempCode = Number(result.categoryCode.replace("C", "")) + 1;
                categories.categoryCode = "C" + tempCode;
            } else {
                categories.categoryCode = "C1";
            }

            categories.save()
                .then(result => {
                    response.status(200).json({
                        message: 'Categories create successful..',
                        data: result,
                        isError: false,
                    });
                })
                .catch(err => {
                    response.status(500).json({
                        isError: true,
                        error: err
                    });
                });
        });
}

exports.get = (request, response, next) => {
    Categories.findOne({ _id: request.params.Categories_id },)
        .exec()
        .then(result => {
            response.status(200).json(result);
        })
        .catch(err => {
            response.status(500).json({
                error: err
            });
        });
}

exports.update = (request, response, next) => {
    const data = {};
    if (request.body.categoryImg === undefined) {
        data.categoryName = request.body.categoryName
        data.categoryImg = "http://localhost:5000/uploads/categories/" + request.file.filename
    }
    else {
        data.categoryName = request.body.categoryName
    }
    Categories.updateMany({ _id: request.params.Categories_id }, { $set: data })
        .exec()
        .then(result => {
            response.status(200).json(result);
        })
        .catch(err => {
            response.status(500).json({
                error: err
            });
        });
}

exports.update_flag = (request, response, next) => {
    Categories.updateOne({ _id: request.params.Categories_id }, { $set: { categoryFlag: request.body.categoryFlag } })
        .exec()
        .then(result => {
            response.status(200).json(result);
        })
        .catch(err => {
            response.status(500).json({
                error: err
            });
        });
}

exports.delete = (request, response, next) => {
    Categories.deleteMany({ _id: request.params.Categories_id })
        .exec()
        .then(result => {
            response.status(200).json(result);
        })
        .catch(err => {
            response.status(500).json({
                error: err
            });
        });
}
