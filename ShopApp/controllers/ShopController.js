const ShopModel = require('../models/ShopModel');

const fetchProducts = async (req, res) => {
    const productName = req.query.product;
    const sortBy = req.query.sortBy;

    if (productName !== undefined) {
        try {
            const result = await ShopModel.find({ productName: productName }).exec();

            if (result) {
                res.status(200).json(result);
            }

        } catch (err) {
            res.status(500).json({ message: "Something went wrong." });
        }
    } else if (sortBy !== undefined) {
        console.log(sortBy);
        if (sortBy === "lowerCostPrice") {
            try {
                const result = await ShopModel.find({}).sort({ costPrice: 1 }).exec();

                if (result) {
                    res.status(200).json(result);
                }
            } catch (err) {
                res.status(500).json({ message: "Something went wrong." });
            }
        } else if (sortBy === "higherCostPrice") {
            try {
                const result = await ShopModel.find().sort({ costPrice: -1 }).exec();

                if (result) {
                    res.status(200).json(result);
                }
            } catch (err) {
                res.status(500).json({ message: "Something went wrong." });
            }
        } else if (sortBy === "lowerSoldPrice") {
            try {
                const result = await ShopModel.find().sort({ soldPrice: 1 }).exec();

                if (result) {
                    res.status(200).json(result);
                }
            } catch (err) {
                res.status(500).json({ message: "Something went wrong." });
            }
        } else if (sortBy === "higherSoldPrice") {
            try {
                const result = await ShopModel.find().sort({ soldPrice: -1 }).exec();

                if (result) {
                    res.status(200).json(result);
                }
            } catch (err) {
                res.status(500).json({ message: "Something went wrong." });
            }
        }
    } else {
        try {
            const result = await ShopModel.find({}).exec();

            if (result) {
                res.status(200).json(result)
            }
        } catch (err) {
            res.status(500).json({ message: "Something went wrong." });
        }
    }
};

const addProduct = async (req, res) => {
    const productName = req.body.productName;
    const costPrice = req.body.costPrice;

    if (productName === undefined || costPrice === undefined) {
        res.status(400).json({ message: "Invalid Input Sent" })
    } else {
        if (productName.length < 4) {
            res.status(400).json({ message: "product Name Should not be less than four Characters." })
        } else if (costPrice <= 0) {
            res.status(400).json({ message: "Cost price should not be zero or Negative." });
        } else {
            try {
                const result = await ShopModel.create({
                    productName,
                    costPrice
                });

                if (result) {
                    res.status(201).json(result);
                }
            } catch (err) {
                res.status(500).json({ message: "Something went wrong." });
            }
        }
    }
}

const updateProductItem = async (req, res) => {
    const productId = req.params['id'];
    console.log(productId);

    if (productId !== undefined) {
        const soldPrice = req.body.soldPrice;
        console.log(soldPrice);
        if (soldPrice > 0) {
            try {
                const result = await ShopModel.updateOne({ _id: productId }, {
                    $set: {
                        soldPrice: soldPrice
                    }
                }).exec();

                if (result.matchedCount === 1) {
                    res.status(200).json({ message: "Record Updated Successfully" });
                } else {
                    res.status(500).json({ message: "Unable to update the record." })
                }
            } catch (err) {
                res.status(500).json({ message: "Something went wrong." });
            }
        } else {
            res.status(400).json({ message: "Sold price cannot be Zero or Negative." });
        }
    } else {
        res.status(500).json({ message: "Unable to process the request." })
    }
}

const deleteProductItem = async (req, res) => {
    const productId = req.params['id'];

    if (productId !== undefined) {
        try {
            const result = await ShopModel.deleteOne({ _id: productId }).exec();

            if (result) {
                res.status(200).json({ message: "Data Deleted Successfully." })
            } else {
                res.status(400).json({ message: "Data Deletion failed." })
            }
        } catch (err) {
            res.status(500).json({ message: "Something went wrong." });
        }
    }
}
module.exports = {
    fetchProducts,
    addProduct,
    updateProductItem,
    deleteProductItem
}
