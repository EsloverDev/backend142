const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    inventario: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true
    }
}, {versionKey: false});

module.exports = mongoose.model('Product', productSchema);