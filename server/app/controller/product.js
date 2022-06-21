const mongoose = require('mongoose');
const Products = require('../models/product');

exports.get_all = (request, response, next) => {
    Products.find({}, {
        productName: 1,
        categoryCode: 1,
        productCode: 1,
        productImg: 1,
        productFlag: 1,
        productDescription: 1,
        productPrice: 1
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
    const products = new Products({
        _id: mongoose.Types.ObjectId(),
        categoryCode: request.body.categoryCode,
        productName: request.body.productName,
        productDescription: request.body.productDescription,
        productPrice: request.body.productPrice,
        productFlag: true
    });
    products.productImg = !request.file ? 'http://localhost:5000/uploads/products/no_image.jpg' : "http://localhost:5000/uploads/products/" + request.file.filename,

        Products.findOne({}, { productCode: 1, }).sort({ '_id': -1 }).limit(1).then(result => {
            if (result) {
                const tempCode = Number(result.productCode.replace("P", "")) + 1;
                products.productCode = "P" + tempCode;
            } else {
                products.productCode = "P1";
            }

            products.save()
                .then(result => {
                    response.status(200).json({
                        message: 'Products create successful..',
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
        })
}

exports.get = (request, response, next) => {
    Products.findOne({ _id: request.params.products_id },)
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
    if (request.body.productImg === undefined) {
        data.categoryCode = request.body.categoryCode
        data.productName = request.body.productName
        data.productDescription = request.body.productDescription
        data.productPrice = request.body.productPrice
        data.productImg = "http://localhost:5000/uploads/products/" + request.file.filename
    }
    else {
        data.categoryCode = request.body.categoryCode
        data.productName = request.body.productName
        data.productDescription = request.body.productDescription
        data.productPrice = request.body.productPrice
    }
    Products.updateMany({ _id: request.params.products_id }, { $set: data })
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
    Products.updateOne({ _id: request.params.Products_id }, { $set: { productFlag: request.body.productFlag } })
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
    Products.deleteMany({ _id: request.params.Products_id })
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
