const Product = require('../models/Product');

exports.addProduct = async(req, res) => {
    try {
        let objectProduct = new Product(req.body);
        await objectProduct.save();
        res.json(objectProduct);
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("There was an error creating the product");
    }
}

exports.showProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("There was an error showing the products");
    }
}

exports.findClient = async(req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if(!product){
            res.status(404).send({msg: "Product not found"});
            return
        } else{
            res.json(product);
        }
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("There was an error finding the product");
    }
}

exports.modifyProduct = async(req, res) => {
    try {
        const objectProduct = await Product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        if(!objectProduct){
            res.status(404).send("The product was not found");
        } else{
            res.json(objectProduct);
        }
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("There was an error modifying the product.");
    }
}

exports.editProduct = async(req, res) => {
    try {
        const objectProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!objectProduct){
            res.status(404).send("The product doesn't exists");
        } else{
            res.json(objectProduct);
        }
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("There was an error editing the product.");
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        let objectProduct = await Product.findById({_id: req.params.id});
        if(!objectProduct){
            res.status(404).send("The product doesn't exists");
        } else{
            await Product.findOneAndDelete({_id: req.params.id});
            res.json({msg: "The product was deleted successfully."});
        }
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("There was an error deleting the product.");
    }
}