const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },

    costPrice: {
        type: Number,
        required: true
    },
    soldPrice: {
        type: Number,
        required: false
    }
});

const ShopModel = mongoose.model('Shop', ShopSchema);

module.exports = ShopModel;