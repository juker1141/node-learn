const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    console.log(productPrice);
    // Fetch the previous cart
    fs.readFile(p, (err, fileContnet) => {
      let cart = { products: [], totalPrice: 0 };
      console.log(err, fileContnet);
      if (!err) {
        const file = JSON.parse(fileContnet);
        console.log(file);
        if (file && file.totalPrice >= 0) cart = file;
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      // 是否已存在購物車
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = existingProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice =
        Math.round((cart.totalPrice + productPrice) * 100) / 100;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContnet) => {
      if (err) return;

      const updatedCart = { ...JSON.parse(fileContnet) };

      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContnet) => {
      const cart = JSON.parse(fileContnet);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
