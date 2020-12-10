const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

let productos = fs.readFileSync(path.join(__dirname, '../database/products.json'), 'utf8');
productos = JSON.parse(productos)

module.exports = {
    root: (req, res) => {
        return res.send(productos);
    },
    create: (req, res) => {
        return res.render('products/create');
    },
    store: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let product = {
                name: req.body.name,
                detail: req.body.detail,
                price: req.body.price,
                discount: req.body.discount,
                image: req.files[0].filename
            }
            productos.push(product);
            fs.writeFileSync(path.join(__dirname, '../database/products.json'), JSON.stringify(productos, null, 4))
        }

        return res.send(productos);
    }
}
