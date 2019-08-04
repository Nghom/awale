const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: false, required: true },
    email: { type: String, unique: true, required: true },
    points: { type: Number, required: true, default: 0 },
    createdDate: { type: Date, default: Date.now },
    password: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
