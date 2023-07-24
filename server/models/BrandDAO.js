require('../utils/MongooseUtil');
const Models = require('./Models');

const BrandDAO = {
    async selectAll() {
        const query = {};
        const brands = await Models.Brand.find(query).exec();
        return brands;
    },
    async insert(brand) {
        const mongoose = require('mongoose');
        brand._id = new mongoose.Types.ObjectId();
        const result = await Models.Brand.create(brand);
        return result;
    },
    async update(brand) {
        const newvalues = { name: brand.name }
        const result = await Models.Brand.findByIdAndUpdate(brand._id, newvalues, { new: true });
        return result;
    },
    async delete(_id) {
        const result = await Models.Brand.findByIdAndRemove(_id);
        return result;
    },
    async selectByID(_id) {
        const brand = await Models.Brand.findById(_id).exec();
        return brand;
    }
}

module.exports = BrandDAO;