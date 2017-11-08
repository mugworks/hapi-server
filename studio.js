'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        city: String,
        state: String,
        country: String
    }
});

module.exports = mongoose.model('Studio', studioSchema);