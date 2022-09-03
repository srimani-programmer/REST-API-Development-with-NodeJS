const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDatabase;
