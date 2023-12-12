const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
  
}, );

const YourModell = mongoose.model('YourModell', yourSchema);

module.exports = YourModell;
