const Products = require('../models/products');
const { validationResult } = require('express-validator');
exports.createNewProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const { name, price } = req.body;
    if (!errors.isEmpty()) {
      const error = new Error(`${errors.errors[0].msg}`);
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    let newProduct = new Products({
      name: name,
      price: price,
      isActive: true,
    });
    await newProduct.save();

    return res.status(200).send({ status: 200, message: 'Product Added' });
  } catch (err) {
    next(err);
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    let data = await Products.find({ isEnabled: true });
    return res
      .status(200)
      .send({ status: 200, message: 'Product Listing', data });
  } catch (err) {
    next(err);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.body;
    const update = { isEnabled: false };
    console.log(id,update)
    await Products.findByIdAndUpdate({ _id: id }, update);
    return res.status(200).send({ status: 200, message: 'Product Deleted' });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id, name, price } = req.body;
    const update = { name, price };
    await Products.findByIdAndUpdate({ _id: id }, update);
    return res.status(200).send({ status: 200, message: 'Product Updated' });
  } catch (err) {
    next(err);
  }
};
